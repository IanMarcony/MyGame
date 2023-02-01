import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, cpf, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      cpf,
      password,
    });

    delete user.password;

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, cpf } = req.body;
    const { id: id_user } = req.user;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      name,
      cpf,
      id_user,
    });

    delete user.password;

    return res.status(200).json(user);
  }
}
