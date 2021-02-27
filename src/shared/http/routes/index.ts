import productsRouter from '@modules/products/products_routes';
import sessionsRouter from '@modules/users/routes/session_routes';
import usersRouter from '@modules/users/routes/users_routes';
import { Router } from 'express';
const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
