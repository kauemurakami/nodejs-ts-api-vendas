import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';
interface IRequest {
  id: string;
}
class DeleteProductsService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas_PRODUCT-LIST');
    await productsRepository.remove(product);
  }
}
export default DeleteProductsService;
