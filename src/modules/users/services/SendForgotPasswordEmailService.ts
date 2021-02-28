import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '../typeorm/repositories/UserTokenRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import EtherealMail from '@config/mail/ethereal_mail';

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
    // console.log(user);
    const token = await userTokenRepository.generate(user.id);
    console.log(token);
    await EtherealMail.sendMail({
      to: { name: user.name, email: user.email },
      subject: 'Recuperação de senha | Equipe deebX',
      templateData: {
        template: `Olá {{name}}: {{token}} `,
        variables: {
          name: user.name,
          token: token.token,
        },
      },
    });
  }
}
export default SendForgotPasswordEmailService;
