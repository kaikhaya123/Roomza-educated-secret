/**
 * Rate limiting for API endpoints
 * In-memory store for development; use Redis for production
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store: Map<string, RateLimitEntry> = new Map();

export interface RateLimitConfig {
  windowMs?: number;    // Time window in milliseconds (default: 15 min)
  maxRequests?: number; // Max requests per window (default: 100)
  keyGenerator?: (ip: string, endpoint: string) => string;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000,  // 15 minutes
  maxRequests: 100,
};

/**
 * Check if request is within rate limit
 * @param ip Client IP address
 * @param endpoint API endpoint
 * @param config Rate limit configuration
 * @returns { allowed: boolean, remaining: number, resetTime: Date }
 */
export function checkRateLimit(
  ip: string,
  endpoint: string,
  config: RateLimitConfig = {}
) {
  const finalConfig = { ...defaultConfig, ...config };
  const key = `${ip}:${endpoint}`;
  const now = Date.now();

  let entry = store.get(key);

  // Create new entry if doesn't exist or window expired
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 0,
      resetTime: now + (finalConfig.windowMs || 15 * 60 * 1000),
    };
    store.get(key) && store.delete(key);
  }

  entry.count++;
  store.set(key, entry);

  const allowed = entry.count <= (finalConfig.maxRequests || 100);
  const remaining = Math.max(0, (finalConfig.maxRequests || 100) - entry.count);
  const resetTime = new Date(entry.resetTime);

  return {
    allowed,
    remaining,
    resetTime,
    limit: finalConfig.maxRequests || 100,
  };
}

/**
 * Get client IP from request
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  
  return (
    (headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Cleanup old entries from store (run periodically)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  
  for (const [key, entry] of store.entries()) {
    if (entry.resetTime < now) {
      store.delete(key);
    }
  }
}

// Clean up every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

/**
 * Specific rate limit presets for common endpoints
 */
export const RATE_LIMITS = {
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,            // 5 attempts
  },
  SMS: {
    windowMs: 60 * 1000,       // 1 minute
    maxRequests: 3,            // 3 SMS per minute
  },
  VOTE: {
    windowMs: 60 * 1000,       // 1 minute
    maxRequests: 10,           // 10 votes per minute
  },
  API: {
    windowMs: 60 * 1000,       // 1 minute
    maxRequests: 100,          // 100 requests per minute
  },
};
