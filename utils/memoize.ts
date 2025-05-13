/**
 * Creates a memoized version of a function that caches results based on input arguments
 * @param fn The function to memoize
 * @param getKey A function to generate a cache key from the arguments
 * @returns A memoized version of the input function
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  getKey: (...args: Parameters<T>) => string = (...args) => JSON.stringify(args)
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
 * @param fn The function to memoize
 * @param maxSize Maximum number of results to cache
 * @param getKey A function to generate a cache key from the arguments
 * @returns A memoized version of the input function with LRU cache
 */
export function memoizeLRU<T extends (...args: any[]) => any>(
  fn: T,
  maxSize: number = 100,
  getKey: (...args: Parameters<T>) => string = (...args) => JSON.stringify(args)
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