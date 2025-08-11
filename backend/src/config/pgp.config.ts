import pgPromise from 'pg-promise';
import { databaseConfig } from './database';

// Initialize pg-promise with custom configuration
const initOptions: pgPromise.IInitOptions = {
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
  },
  // Prevent duplicate connections
  capSQL: true
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

// Create database instance with singleton pattern to prevent duplicate connections
class DatabaseConnection {
  private static instance: pgPromise.IDatabase<{}> | null = null;
  private static isConnecting = false;

  static getInstance(): pgPromise.IDatabase<{}> {
    if (!DatabaseConnection.instance && !DatabaseConnection.isConnecting) {
      DatabaseConnection.isConnecting = true;
      try {
        const config = getConnectionConfig();
        DatabaseConnection.instance = pgp(config);
        console.log('✅ Database connection established');
      } catch (error) {
        console.error('❌ Failed to create database connection:', error);
        throw error;
      } finally {
        DatabaseConnection.isConnecting = false;
      }
    }
    
    if (!DatabaseConnection.instance) {
      throw new Error('Database connection not available');
    }
    
    return DatabaseConnection.instance;
  }

  // Method to test connection
  static async testConnection(): Promise<boolean> {
    try {
      const db = DatabaseConnection.getInstance();
      await db.one('SELECT 1 as test');
      console.log('✅ Database connection test successful');
      return true;
    } catch (error) {
      console.error('❌ Database connection test failed:', error);
      return false;
    }
  }

  // Method to close connection (use with caution)
  static async closeConnection(): Promise<void> {
    if (DatabaseConnection.instance) {
      try {
        await DatabaseConnection.instance.$pool.end();
        DatabaseConnection.instance = null;
        console.log('✅ Database connection closed');
      } catch (error) {
        console.error('❌ Error closing database connection:', error);
        throw error;
      }
    }
  }

  // Get connection pool statistics
  static getPoolStats() {
    if (DatabaseConnection.instance) {
      return {
        totalCount: DatabaseConnection.instance.$pool.totalCount,
        idleCount: DatabaseConnection.instance.$pool.idleCount,
        waitingCount: DatabaseConnection.instance.$pool.waitingCount
      };
    }
    return null;
  }
}

// Export the database instance and utilities
export const db = DatabaseConnection.getInstance;
export const testConnection = DatabaseConnection.testConnection;
export const closeConnection = DatabaseConnection.closeConnection;
export const getPoolStats = DatabaseConnection.getPoolStats;
export { pgp };

// Export default database instance
export default DatabaseConnection.getInstance();
