import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmailService.execute({ email });
    return response.status(204).json();
    //204 tudo correu bem mas nao possui retorno
  }
}
