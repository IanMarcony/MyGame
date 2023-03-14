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
    const users = await this.usersRepository.findAllByName(username);

    for (const user of users) {
      delete user.password;
      delete user.id;
      delete user.url_banner_photo;
      delete user.birth_date;
      delete user.description;
      delete user.created_at;
      delete user.updated_at;
    }

    return users;
  }
}
