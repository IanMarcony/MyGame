import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      birth_date,
      description,
      accounts_game,
      preferences,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      birth_date,
      description,
      accounts_game,
      preferences,
    });

    delete user.password;

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, birth_date, description } = req.body;
    const { id: id_user } = req.user;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      name,
      birth_date,
      description,
      id_user,
    });

    delete user.password;
    delete user.id;

    return res.status(200).json(user);
  }
}
