import productsRouter from '@modules/products/products_routes';
import { Router } from 'express';
const routes = Router();

routes.use('/products', productsRouter);

export default routes;
