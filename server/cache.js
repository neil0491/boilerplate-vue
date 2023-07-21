import { LRUCache } from "lru-cache";

// exemple https://github.com/surmon-china/surmon.me/blob/187ac582af365e5d5818f2dff389c41248702094/src/server/cache.ts
const getLRUClient = () => {
  // https://github.com/isaacs/node-lru-cache
  const lruCache = new LRUCache({
    max: 500,
    ttl: 0 // MARK: default 0 "no TTL" never expire
  });

  return {
    set: async (key, value, maxAge) => {
      if (maxAge) {
        lruCache.set(key, value, { ttl: maxAge * 1000 });
      } else {
        lruCache.set(key, value);
      }
    },
    get: async (key) => lruCache.get(key),
    has: async (key) => lruCache.has(key),
    delete: async (key) => lruCache.delete(key),
    clear: async () => lruCache.clear()
  };
};

export const initCacheClient = async () => {
  let cacheClient = null;

  cacheClient = getLRUClient();
  // console.info("[cache]", "LRU store readied!");

  await cacheClient.clear();
  return cacheClient;
};
