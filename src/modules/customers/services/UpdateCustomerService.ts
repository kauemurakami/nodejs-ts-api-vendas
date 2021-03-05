import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
class UpdateCustomerService {
  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(user_id);
    if (!customer) {
      throw new AppError('Usuário não encontrado');
    }
    const userUpdateEmail = await customersRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id != user_id) {
      throw new AppError('Já existe um usuário com este email');
    }
    if (password && !old_password) {
      throw new AppError('Senha atual requerida.');
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, customer.password);
      if (!checkOldPassword) {
        throw new AppError('Senha atual não confere.');
      }
      customer.password = await hash(password, 8);
    }
    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
export default UpdateCustomerService;
