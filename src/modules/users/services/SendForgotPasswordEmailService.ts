import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '../typeorm/repositories/UserTokenRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    console.log(user);
    const token = await userTokenRepository.generate(user.id);
    console.log(token);
  }
}
export default SendForgotPasswordEmailService;
