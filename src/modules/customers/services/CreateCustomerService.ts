import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateCustomerService {
  public async execute({ name, email, password }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customerRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Ops, já existe um usuário com este email.');
    }

    const hashedPassword = await hash(password, 8);

    const customers = customerRepository.create({ name, email, password: hashedPassword });

    await customerRepository.save(customers);
    return customers;
  }
}
export default CreateCustomerService;
