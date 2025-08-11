import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { bearer } from '@elysiajs/bearer';
import { authService } from '../services/auth.service';
import type { User, UserRole } from '../types';

// Debug function
const debugLog = (message: string, data?: any) => {
  console.log(`[AUTH_MIDDLEWARE] ${message}`, data || '');
};

export const authMiddleware = (app: Elysia) =>
  app
  .use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET || 'your-secret-key'
  }))
  .use(bearer())
  .derive(async ({ bearer, jwt }) => {
    try {
      debugLog('=== AUTH MIDDLEWARE START ===');
      debugLog('Bearer token:', bearer ? 'Present' : 'Not present');

      if (!bearer) {
        debugLog('❌ No bearer token');
        return { currentUser: null };
      }

      // Verify JWT token
      let payload: any;
      try {
        payload = await jwt.verify(bearer);
        debugLog('✅ JWT verified successfully');
        debugLog('Payload:', payload);
      } catch (jwtError) {
        debugLog('❌ JWT verification failed:', jwtError);
        if (jwtError instanceof Error) {
          debugLog('JWT Error message:', jwtError.message);
        }
        return { currentUser: null };
      }

      if (!payload || typeof payload === 'boolean' || !payload.id) {
        debugLog('❌ Invalid JWT payload structure');
        return { currentUser: null };
      }

      // Get user from database
      let user: any;
      try {
        const userId = parseInt(payload.id.toString());
        debugLog('Fetching user with ID:', userId);

        if (isNaN(userId)) {
          debugLog('❌ Invalid user ID format');
          return { currentUser: null };
        }

        user = await authService.getUserById(userId);
        debugLog('User from DB:', user ? 'Found' : 'Not found');

        if (!user) {
          debugLog('❌ User not found in database');
          return { currentUser: null };
        }

        if (user.status !== 'ACTIVE') {
          debugLog('❌ User account is not active:', user.status);
          return { currentUser: null };
        }

        debugLog('✅ User is active');
      } catch (dbError) {
        debugLog('❌ Database error:', dbError);
        return { currentUser: null };
      }

      // Create currentUser object
      const currentUser: User = {
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

      debugLog('✅ Current user created:', currentUser.email);
      debugLog('=== AUTH MIDDLEWARE SUCCESS ===');

      return { currentUser };

    } catch (error) {
      debugLog('❌ Unexpected error in auth middleware:', error);
      return { currentUser: null };
    }
  });

export const requireAuth = (app: Elysia) =>
  app.use(authMiddleware)
  .guard({
    beforeHandle: (ctx: any) => {
      debugLog('=== REQUIRE AUTH GUARD ===');
      debugLog('Current user exists:', !!ctx.currentUser);

      if (!ctx.currentUser) {
        debugLog('❌ Authentication required - blocking request');
        ctx.set.status = 401;
        return {
          success: false,
          message: 'Authentication required'
        };
      }

      debugLog('✅ Authentication passed');
    }
  });

export const requireRole = (roles: UserRole[]) => 
  new Elysia()
    .use(authMiddleware)
    .guard({
      beforeHandle: (ctx: any) => {
        debugLog('=== ROLE GUARD ===');
        debugLog('Required roles:', roles);
        debugLog('User role:', ctx.currentUser?.role);

        if (!ctx.currentUser) {
          debugLog('❌ No authenticated user');
          ctx.set.status = 401;
          return {
            success: false,
            message: 'Authentication required'
          };
        }

        if (!roles.includes(ctx.currentUser.role)) {
          debugLog('❌ Insufficient permissions');
          ctx.set.status = 403;
          return {
            success: false,
            message: 'Insufficient permissions'
          };
        }

        debugLog('✅ Role authorization passed');
      }
    });

// JWT utilities are now in ../utils/jwt.utils.ts 