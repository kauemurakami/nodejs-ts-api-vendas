import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

class ListUsersService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UsersRepository);
    const users = userRepository.find();
    return users;
  }
}
export default ListUsersService;
