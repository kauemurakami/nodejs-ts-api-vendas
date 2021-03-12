import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomersService from '../services/ListCustomerService';
import ShowCustomersService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class CustomersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomersService();
    const customers = await listCustomers.execute();
    return response.json(customers);
  }
  public async showOne(request: Request, response: Response): Promise<Response> {
    const showCustomer = new ShowCustomersService();
    const { id } = request.params;
    const customer = await showCustomer.execute({ id });
    return response.json(customer);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createCustomer = new CreateCustomerService();
    const customer = await createCustomer.execute({ name, email, password });
    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCustomerService = new UpdateCustomerService();
    const { id } = request.params;
    const { name, email } = request.body;
    const customer = await updateCustomerService.execute({ id, name, email });
    return response.status(200).json(customer);
    //204 tudo correu bem mas nao possui retorno
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomerService = new DeleteCustomerService();
    await deleteCustomerService.execute({ id });
    return response.status(200).json({ message: 'Cliente deletado' });
  }
}
