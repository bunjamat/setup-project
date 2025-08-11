import { Elysia } from "elysia";
import { authController } from "../controllers/auth.controller";
import { testConnection, getPoolStats } from "../config/pgp.config";

export const apiRoutes = new Elysia({ prefix: "/api" })
  // .use(authController)
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
  });
