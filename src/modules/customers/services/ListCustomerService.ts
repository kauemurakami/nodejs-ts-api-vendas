import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ListCustomersService {
  public async execute(): Promise<User[]> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customers = customersRepository.find();
    return customers;
  }
}
export default ListCustomersService;
