import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarService = new UpdateUserAvatarService();
    const user = updateAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.json(classToClass(user));
  }
}
