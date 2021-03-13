import { Router } from 'express';
import OrdersController from './controllers/orders_controller';
import { Joi, celebrate, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const controller = new OrdersController();
const ordersRouter = Router();
ordersRouter.use(isAuthenticated);
ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.show,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().required(),
    },
  }),
  controller.create,
);

export default ordersRouter;
