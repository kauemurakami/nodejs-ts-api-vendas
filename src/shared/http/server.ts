import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import rateLimiter from '@shared/http/middlewares/rate_limiter';

const app = express();
app.use(cors());
app.use(express.json());
//middleware limiter/anti DDoS antes de qualquer rorta e qualqeur requisição
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
//middleware de captura de erros
app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message });
  }
  return response.status(500).json({ status: 'error', message: 'internal server error' });
});
app.listen(3333, () => {
  console.log('Server Started on port 3333 👯‍♂️');
});
