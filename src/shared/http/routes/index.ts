import productsRouter from '@modules/products/products_routes';
import usersRouter from '@modules/users/users_routes';
import { Router } from 'express';
const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
