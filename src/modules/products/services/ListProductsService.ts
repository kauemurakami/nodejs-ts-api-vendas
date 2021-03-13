import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();
    //verifica se há esta cahve
    let products = await redisCache.recover<Product[]>('api-vendas_PRODUCT-LIST');
    //caso nao exista vamos ao banco de dados
    if (!products) {
      products = await productsRepository.find();
      //criamos o cache caso nao exista, e após buscado criamos ele
      await redisCache.save('api-vendas_PRODUCT-LIST', products);
    }

    return products;
  }
}
export default ListProductsService;
