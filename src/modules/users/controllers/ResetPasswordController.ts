import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordService = new ResetPasswordService();

    await resetPasswordService.execute({ token, password });

    return response.status(204).json();
    //204 tudo correu bem mas nao possui retorno
  }
}
