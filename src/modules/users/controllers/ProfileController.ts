import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfileService = new ShowProfileService();
    const user_id = request.user.id;
    const user = await showProfileService.execute({ user_id });
    return response.status(200).json(classToClass(user));
    //204 tudo correu bem mas nao possui retorno
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = new UpdateProfileService();
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const user = await updateProfileService.execute({ user_id, name, email, password, old_password });
    return response.status(200).json(classToClass(user));
    //204 tudo correu bem mas nao possui retorno
  }
}
