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

  async execute({ name, cpf, id_user }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.findById(id_user);

    if (!checkUserExist) {
      throw new AppError('User not exists');
    }

    checkUserExist.name = name;
    checkUserExist.cpf = cpf;

    const user = await this.usersRepository.update(checkUserExist);

    return user;
  }
}
