import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id_user: number;
}
@injectable()
export default class ShowProfileUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ id_user }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id_user);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    this.usersRepository.delete(user);
  }
}
