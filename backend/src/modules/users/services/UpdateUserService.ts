import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  birth_date: Date;
  description: string;
  id_user: number;
}
@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({
    name,
    id_user,
    birth_date,
    description,
  }: IRequest): Promise<User> {
    const checkUserExistWithSameName = await this.usersRepository.findByName(
      name,
    );

    if (checkUserExistWithSameName) {
      throw new AppError('Name already exists');
    }

    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('User not exists');
    }

    user.name = name;
    user.birth_date = birth_date;
    user.description = description;

    return await this.usersRepository.update(user);
  }
}
