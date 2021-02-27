import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

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
    const decodedToken = verify(token, authConfig.jwt.secret);
    // console.log(decodedToken);
    const { sub } = decodedToken as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Token inválido');
  }
}
