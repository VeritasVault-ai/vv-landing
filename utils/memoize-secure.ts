/**
 * Security-enhanced memoization utilities
 * These utilities provide memoization while preventing sensitive data from being cached
 */

/**
 * Identifies potentially sensitive field names that should not be cached
 * @param key The field name to check
 * @returns True if the field name appears to be sensitive
 */
function isSensitiveFieldName(key: string): boolean {
  const sensitivePatterns = [
    /password/i,
    /token/i,
    /secret/i,
    /key/i,
    /auth/i,
    /credential/i,
    /private/i,
    /jwt/i,
    /session/i,
    /api[-_]?key/i,
    /access[-_]?token/i,
    /refresh[-_]?token/i,
    /connection[-_]?string/i
  ];
  
  return sensitivePatterns.some(pattern => pattern.test(key));
}

/**
 * Sanitizes an object by redacting sensitive fields
 * @param obj The object to sanitize
 * @returns A sanitized copy of the object
 */
// At the top of utils/memoize-secure.ts
const seen = new WeakSet<object>();

function sanitizeObject(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  
  // Handle primitive types
  if (typeof obj !== 'object') return obj;
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  // Protect against circular references
  if (seen.has(obj)) {
    return '[CIRCULAR]';
  }
  seen.add(obj);
  
  // Handle objects
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (isSensitiveFieldName(key)) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Creates a memoized version of a function that caches results based on input arguments
 * with security enhancements to prevent caching sensitive data
 * @param fn The function to memoize
 * @param sensitiveParamIndices Indices of parameters that contain sensitive data
 * @param getKey A function to generate a cache key from the arguments
 * @returns A memoized version of the input function
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  sensitiveParamIndices: number[] = [],
  getKey: (...args: Parameters<T>) => string = (...args) => {
    // Create sanitized arguments for key generation
    const sanitizedArgs = args.map((arg, index) => {
      if (sensitiveParamIndices.includes(index)) {
        return '[REDACTED]';
      }
      
      if (typeof arg === 'object' && arg !== null) {
        return sanitizeObject(arg);
      }
      
      return arg;
    });
    
    return JSON.stringify(sanitizedArgs);
  }
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  const memoized = ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey(...args);
    
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
  
  // Add a method to clear the cache
  (memoized as any).clearCache = () => {
    cache.clear();
  };
  
  return memoized;
}

/**
 * Creates a memoized function with a limited cache size that evicts least recently used items
 * with security enhancements to prevent caching sensitive data
 * @param fn The function to memoize
 * @param maxSize Maximum number of results to cache
 * @param sensitiveParamIndices Indices of parameters that contain sensitive data
 * @param getKey A function to generate a cache key from the arguments
 * @returns A memoized version of the input function with LRU cache
 */
export function memoizeLRU<T extends (...args: any[]) => any>(
  fn: T,
  maxSize: number = 100,
  sensitiveParamIndices: number[] = [],
  getKey: (...args: Parameters<T>) => string = (...args) => {
    // Create sanitized arguments for key generation
    const sanitizedArgs = args.map((arg, index) => {
      if (sensitiveParamIndices.includes(index)) {
        return '[REDACTED]';
      }
      
      if (typeof arg === 'object' && arg !== null) {
        return sanitizeObject(arg);
      }
      
      return arg;
    });
    
    return JSON.stringify(sanitizedArgs);
  }
): T {
  const cache = new Map<string, ReturnType<T>>();
  const accessOrder: string[] = [];
  
  const memoized = ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey(...args);
    
    // If key exists, update access order
    if (cache.has(key)) {
      // Move key to the end of access order (most recently used)
      const index = accessOrder.indexOf(key);
      if (index > -1) {
        accessOrder.splice(index, 1);
      }
      accessOrder.push(key);
      
      return cache.get(key) as ReturnType<T>;
    }
    
    // Compute new result
    const result = fn(...args);
    
    // If cache is full, remove least recently used item
    if (cache.size >= maxSize && accessOrder.length > 0) {
      const lruKey = accessOrder.shift()!;
      cache.delete(lruKey);
    }
    
    // Add new result to cache
    cache.set(key, result);
    accessOrder.push(key);
    
    return result;
  }) as T;
  
  // Add a method to clear the cache
  (memoized as any).clearCache = () => {
    cache.clear();
    accessOrder.length = 0;
  };
  
  return memoized;
}