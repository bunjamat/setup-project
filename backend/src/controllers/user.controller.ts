import { Elysia } from "elysia";
import { db } from "../config/pgp.config";

// ตัวอย่างการใช้งาน pg-promise ใน controller
export const userController = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    try {
      // Query แบบ any() - สำหรับ SELECT หลายแถว
      const users = await db.any('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC');
      
      return {
        success: true,
        message: "Users fetched successfully",
        data: users,
        count: users.length
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch users",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  })
  
  .get("/:id", async ({ params: { id } }) => {
    try {
      // Query แบบ oneOrNone() - สำหรับ SELECT แถวเดียว (อาจไม่มี)
      const user = await db.oneOrNone('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
      
      if (!user) {
        return {
          success: false,
          message: "User not found"
        };
      }
      
      return {
        success: true,
        message: "User fetched successfully",
        data: user
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch user",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  })
  
  .post("/", async ({ body }: { body: any }) => {
    try {
      // Query แบบ one() - สำหรับ INSERT และ return แถวที่ insert
      const newUser = await db.one(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
        [body.name, body.email]
      );
      
      return {
        success: true,
        message: "User created successfully",
        data: newUser
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to create user",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  })
  
  .put("/:id", async ({ params: { id }, body }: { params: { id: string }, body: any }) => {
    try {
      // Query แบบ oneOrNone() สำหรับ UPDATE
      const updatedUser = await db.oneOrNone(
        'UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING id, name, email, updated_at',
        [body.name, body.email, id]
      );
      
      if (!updatedUser) {
        return {
          success: false,
          message: "User not found"
        };
      }
      
      return {
        success: true,
        message: "User updated successfully",
        data: updatedUser
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update user",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  })
  
  .delete("/:id", async ({ params: { id } }) => {
    try {
      // Query แบบ result() สำหรับ DELETE
      const result = await db.result('DELETE FROM users WHERE id = $1', [id]);
      
      if (result.rowCount === 0) {
        return {
          success: false,
          message: "User not found"
        };
      }
      
      return {
        success: true,
        message: "User deleted successfully",
        deletedCount: result.rowCount
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete user",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  })
  
  // ตัวอย่างการใช้ Transaction
  .post("/batch", async ({ body }: { body: any }) => {
    try {
      const result = await db.tx(async (t) => {
        // ใน transaction สามารถใช้ t แทน db
        const users = [];
        
        for (const userData of body.users) {
          const user = await t.one(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
            [userData.name, userData.email]
          );
          users.push(user);
        }
        
        return users;
      });
      
      return {
        success: true,
        message: "Users created successfully",
        data: result,
        count: result.length
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to create users",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
