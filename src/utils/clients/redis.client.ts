import { createClient } from 'redis';
import config from '../../config';

const { EXPIRE_TIME, host, port } = config.redis;

const redisUrl = `redis://${host}:${port}`;

export const redisClient = createClient({url: redisUrl});

export class RedisClient {
  static async get(key: string) {
    return redisClient.get(key);
  }
  static async set(key: string, value: string, EX = EXPIRE_TIME) {
    return redisClient.set(key, value, { EX });
  }
}
