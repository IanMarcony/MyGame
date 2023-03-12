import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import SearchUsersService from '@modules/users/services/SearchUsersService';
import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';
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
    delete user.id;

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

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: id_user } = req.user;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({
      id_user,
    });

    return res.status(204).json({});
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { username } = req.query;

    const searchUser = container.resolve(SearchUsersService);

    const users = await searchUser.execute({
      username: (username as string) || '',
    });

    return res.status(200).json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;
    const { id: id_user } = req.user;

    const showProfile = container.resolve(ShowProfileUserService);

    const profile = await showProfile.execute({
      email,
      id_user,
    });

    delete profile.password;

    return res.status(200).json(profile);
  }
}
