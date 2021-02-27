import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  token: string;
  user: User;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Usuário não encontrado', 401);
    }
    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Senha incorreta', 401);
    }

    const token = sign({}, '9a252d99c9cfc7c3b2bba1e1a75442c6', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { token, user };
  }
}
export default CreateSessionsService;
