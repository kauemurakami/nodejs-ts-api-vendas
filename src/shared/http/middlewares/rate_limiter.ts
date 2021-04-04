import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.SECRET || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  //num de req por segundo por ip
  points: 5,
  //seconds
  duration: 1,
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError('Muitas requisições num curto intervalo de tempo', 429);
  }
}
