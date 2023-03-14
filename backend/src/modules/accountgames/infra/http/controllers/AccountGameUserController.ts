import UpdateAccountGameUserService from '@modules/accountgames/services/UpdateAccountGameUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AccountGameUsersRepository from '../../typeorm/repositories/AccountGameUsersRepository';

export default class AccountGameUserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id: id_user } = req.user;
    const accountGameUsersRepository = new AccountGameUsersRepository();

    const accountGameUsers = await accountGameUsersRepository.findAllByIdUser(
      id_user,
    );

    return res.status(200).json(accountGameUsers);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: id_user } = req.user;
    const { accounts } = req.body;

    const updateAccountGameUserService = container.resolve(
      UpdateAccountGameUserService,
    );

    const accountGameUsers = await updateAccountGameUserService.execute({
      accounts,
      id_user,
    });

    return res.status(200).json(accountGameUsers);
  }
}

