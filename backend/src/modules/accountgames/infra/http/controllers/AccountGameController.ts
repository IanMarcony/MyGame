import { Request, Response } from 'express';
import AccountGameRepository from '../../typeorm/repositories/AccountGameRepository';

export default class AccountGameController {
  public async index(req: Request, res: Response): Promise<Response> {
    const accountGameRepository = new AccountGameRepository();

    const accountGames = await accountGameRepository.findAll();

    return res.status(200).json(accountGames);
  }
}
