import { Router } from 'express';

import productsRouter from '@modules/products/products_routes';
import passwordRouter from '@modules/users/routes/password_routes';
import sessionsRouter from '@modules/users/routes/session_routes';
import usersRouter from '@modules/users/routes/users_routes';
import profileRouter from '@modules/users/routes/profile_routes';
import customersRouter from '@modules/customers/routes/customer_routes';
import ordersRouter from '@modules/orders/orders_routes';
const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
