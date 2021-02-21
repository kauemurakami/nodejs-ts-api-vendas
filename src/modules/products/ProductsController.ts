import { Request, Response } from 'express';
import CreateProductService from './services/CreateProductService';
import DeleteProductsService from './services/DeleteProductService';
import ListProductsService from './services/ListProductsService';
import ShowProductsService from './services/ShowProductService';
import UpdateProductsService from './services/UpdateProductService';
export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductsService();
    const products = await listProductsService.execute();
    return response.status(200).json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProductsService = new ShowProductsService();
    const product = await showProductsService.execute({ id });
    return response.status(200).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({ name, price, quantity });
    return response.status(200).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProductService = new UpdateProductsService();
    const product = await updateProductService.execute({ id, name, quantity, price });
    return response.status(200).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProductsService = new DeleteProductsService();
    await deleteProductsService.execute({ id });
    return response.status(200).json({ message: 'Produto deletado' });
  }
}
