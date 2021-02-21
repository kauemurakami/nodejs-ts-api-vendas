import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

class UpdateProductsService {
  public async execute({ id, name, quantity, price }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError('Produto já existe!');
    }
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);
    return product;
  }
}
export default UpdateProductsService;
