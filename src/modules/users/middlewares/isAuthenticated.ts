import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Você não está autenticado', 401);
  }
  //suprimindo bearer
  //0          1
  //Bearer distokenahatokensohdaioshodtokentrokenoktneijwodw
  const [, token] = authHeader.split(' ');

  try {
    //verifica se esse token foi criado com essa secret
    const decodeToken = verify(token, authConfig.jwt.secret);
    return next();
  } catch {
    throw new AppError('Token inválido');
  }
}
