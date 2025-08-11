import { Elysia } from 'elysia';   
import { authController } from '../controllers/auth.controller';

export const apiRoutes = new Elysia({ prefix: '/api' })
.use(authController)
.get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Project Name API is running'
})); 