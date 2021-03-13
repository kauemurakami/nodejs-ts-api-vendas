import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Orders';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Usuário não encontrado');
    }

    const existsProducts = await productsRepository.findAllByIds(products);
    if (!existsProducts.length) {
      throw new AppError('Nenhum produto encontrado');
    }
    //produtos que existem
    const existsProductsId = existsProducts.map(product => product.id);

    //ids que nao existem
    const checkInexistente = products.filter(product => !existsProductsId.includes(product.id));
    if (existsProductsId.length) {
      throw new AppError(`Estes produtos não existem ${checkInexistente[0].id}`);
    }

    //verifica se a quantidade esta disponível ( nao vender mais do que se que tem em estoque)
    const quantityAvailable = products.filter(
      product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity,
    );
    if (quantityAvailable.length) {
      throw new AppError(`Quantidade excedida ${quantityAvailable[0].quantity} para ${quantityAvailable[0].id}`);
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;
    const updatedProductQuantity = order_products.map(product => ({
      id: product.id,
      quantity: existsProducts.filter(p => p.id === product.id)[0].quantity - product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
export default CreateOrderService;
