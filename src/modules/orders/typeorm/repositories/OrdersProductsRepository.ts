import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Orders';

@EntityRepository(Order)
export class ProductRepository extends Repository<Order> {
  public async findByName(name: string): Promise<Order | undefined> {
    const product = this.findOne({ where: { name } });
    return product;
  }
}
