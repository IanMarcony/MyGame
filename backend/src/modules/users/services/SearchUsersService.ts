import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  username: string;
}
@injectable()
export default class SearchUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ username }: IRequest): Promise<User[]> {
    return await this.usersRepository.findAllByName(username);
  }
}
