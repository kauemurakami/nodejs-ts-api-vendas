import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { id } from 'date-fns/locale';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}
class UpdateProfileService {
  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    const userUpdateEmail = await userRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id != user_id) {
      throw new AppError('Já existe um usuário com este email');
    }
    if (password && !old_password) {
      throw new AppError('Senha atual requerida.');
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError('Senha atual não confere.');
      }
      user.password = await hash(password, 8);
    }
    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}
export default UpdateProfileService;
