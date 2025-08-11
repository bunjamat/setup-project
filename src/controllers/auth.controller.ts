import Elysia from "elysia";
import jwt from "@elysiajs/jwt";
import { httpStatus, ResponseHelper } from "../utils/response.utils";

export const authController = new Elysia({
    prefix: '/auth',
    tags: ['Authentication']
  })
  .use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET || 'your-secret-key',
    exp: '7d'
  }))
    // POST /auth/login
    .post('/sign-in', async ({ body, set, jwt }) => {
        try {
          // ตรวจสอบการเข้าสู่ระบบ
          const query = await db.query("SELECT * FROM users WHERE email = $1", [body.email]);

          if (!user) {
            set.status = httpStatus.UNAUTHORIZED;
            return ResponseHelper.error('Invalid credentials');
          }

          const user = await authService.authenticate(body);
          console.log("🚀 ~ .post ~ user:", user)
    
          if (!user) {
            set.status = httpStatus.UNAUTHORIZED;
            return ResponseHelper.error('Invalid credentials');
          }
    
          // สร้าง JWT token
          const userForToken = {
            id: user.id.toString(),
            email: user.email,
            username: user.username || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            role: user.role.name as UserRole,
            isActive: user.status === 'ACTIVE',
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          };
    
          const now = Math.floor(Date.now() / 1000);
          const expiresIn = 7 * 24 * 60 * 60; // 7 days in seconds
    
          const token = await jwt.sign({
            id: userForToken.id,
            email: userForToken.email,
            username: userForToken.username,
            role: userForToken.role
          });
    
          const response: AuthResponse = {
            user: userForToken,
            accessToken: token
          };
    
          return ResponseHelper.success(response, 'Login successful');
        } catch (error) {
          console.error('Login error:', error);
    
          if (error instanceof Error) {
            if (error.message === 'Account is not active') {
              set.status = httpStatus.FORBIDDEN;
              return ResponseHelper.error('Account is not active');
            }
          }
    
          set.status = httpStatus.INTERNAL_SERVER_ERROR;
          return ResponseHelper.error('Login failed');
        }
      }, {
        body: userSchemas.login,
        detail: {
          summary: 'User login',
          description: 'Authenticate user with email and password',
          tags: ['Authentication'],
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'object',
                        properties: {
                          user: { $ref: '#/components/schemas/User' },
                          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                        }
                      },
                      message: { type: 'string', example: 'Login successful' }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ValidationError' }
                }
              }
            },
            401: {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      message: { type: 'string', example: 'Invalid credentials' }
                    }
                  }
                }
              }
            }
          }
        }
      })