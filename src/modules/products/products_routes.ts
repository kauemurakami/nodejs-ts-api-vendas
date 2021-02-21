import { Router } from 'express';
import ProductsController from './ProductsController';
const controller = new ProductsController();
const productsRouter = Router();

productsRouter.get('/', controller.index);
productsRouter.get('/:id', controller.show);
productsRouter.post('/', controller.create);
productsRouter.put('/:id', controller.update);
productsRouter.delete('/:id', controller.delete);

export default productsRouter;
