import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

export default class RedisCache {
  private client: RedisClient;
  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    console.log(key, value);
    await this.client.set(key, JSON.stringify(value));
  }

  // public async recover<T>(key: string): Promise<T | null> {
  //   console.log(key);
  // }

  //public async invalidate(key: string): Promise<void>{

  //}
}
