import pgPromise from 'pg-promise';
import { databaseConfig } from './database';

// Initialize pg-promise with custom configuration
const initOptions: pgPromise.IInitOptions = {
  schema: 'public', // can also be an array of strings or a callback
  // capSQL: true จะทำให้ pg-promise สร้าง SQL statement ที่มีตัวอักษรใหญ่ทั้งหมด (เช่น SELECT, FROM, WHERE) เพื่อความสอดคล้องและอ่านง่าย
  capSQL: true, // capitalize all generated SQL
  // Global event logging
  query(e) {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true') {
      console.log('Query:', e.query);
      if (e.params) {
        console.log('Parameters:', e.params);
      }
    }
  },
  error(err, e) {
    console.error('Database error:', err);
    if (e.query) {
      console.error('Query:', e.query);
    }
    if (e.params) {
      console.error('Parameters:', e.params);
    }
  },
  connect(e) {
    const cp = e.client.connectionParameters;
    console.log(`Connected to database: ${cp.database} (${cp.host}:${cp.port}) - useCount: ${e.useCount}`);
  },
  disconnect(e) {
    const cp = e.client.connectionParameters;
    console.log(`Disconnected from database: ${cp.database} (${cp.host}:${cp.port})`);
  }
};

// Create pg-promise instance
const pgp = pgPromise(initOptions);

// Database connection configuration
const getConnectionConfig = () => {
  // Use connection string if available, otherwise use individual config
  if (databaseConfig.url) {
    return {
      connectionString: databaseConfig.url,
      ssl: databaseConfig.ssl
    };
  }

  return {
    host: databaseConfig.host,
    port: databaseConfig.port,
    database: databaseConfig.database,
    user: databaseConfig.username,
    password: databaseConfig.password,
    ssl: databaseConfig.ssl,
    // Connection pool settings to prevent duplicate connections
    max: databaseConfig.poolConfig.max,
    min: databaseConfig.poolConfig.min,
    idleTimeoutMillis: databaseConfig.poolConfig.idleTimeoutMillis,
    connectionTimeoutMillis: databaseConfig.poolConfig.connectionTimeoutMillis,
    allowExitOnIdle: databaseConfig.poolConfig.allowExitOnIdle
  };
};

// Create database connection
const connection = getConnectionConfig();
const dbPos  = pgp(connection);


// Helper functions for testing and utilities
export const testConnection = async (): Promise<boolean> => {
  try {
    await dbPos.one('SELECT 1 as test');
    console.log('✅ Database connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
};

export const closeConnection = async (): Promise<void> => {
  try {
    await dbPos.$pool.end();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
};

export const getPoolStats = () => {
  try {
    return {
      totalCount: dbPos.$pool.totalCount,
      idleCount: dbPos.$pool.idleCount,
      waitingCount: dbPos.$pool.waitingCount
    };
  } catch (error) {
    return null;
  }
};

// Export pg-promise instance and database connection
export { pgp, dbPos };

// Export default database instance
export default dbPos;
