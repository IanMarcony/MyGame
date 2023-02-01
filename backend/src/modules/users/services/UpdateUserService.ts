import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  cpf: string;
  id_user: number;
}
@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ name, id_user }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('User not exists');
    }

    user.name = name;

    return await this.usersRepository.update(user);
  }
}
