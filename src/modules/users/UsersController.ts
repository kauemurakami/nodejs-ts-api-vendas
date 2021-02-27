import { Request, Response } from 'express';
import ListUsersService from './services/ListUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService();
    const users = listUser.execute();
    return response.json(users);
  }

  create() {}
}
