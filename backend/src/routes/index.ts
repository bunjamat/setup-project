import { Elysia } from "elysia";
import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";
import { db, testConnection, getPoolStats } from "../config/pgp.config";
import { saleController } from "../controllers/sale.controller";

export const apiRoutes = new Elysia({ prefix: "/api" })
  // .use(authController)
//   .use(userController)
  .use(saleController)
  .get("/health", async () => {
    // test database connection
    const isConnected = await testConnection();
    const poolStats = getPoolStats();
    
    console.log("Database connection status:", isConnected);
    console.log("Connection pool stats:", poolStats);

    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      message: "Project Name API is running",
      database: {
        connected: isConnected,
        poolStats: poolStats || "Not available"
      }
    };
  })
  .get("/test-db", async () => {
    try {
      // ตัวอย่างการใช้งาน db โดยตรง
      const result = await db.one('SELECT NOW() as current_time, $1 as message', ['Hello from pg-promise!']);
      
      return {
        success: true,
        message: "Database query successful",
        data: result
      };
    } catch (error) {
      return {
        success: false,
        message: "Database query failed",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
