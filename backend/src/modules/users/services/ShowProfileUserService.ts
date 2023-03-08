import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IFriendRequestsRepository from '../repositories/IFriendRequestsRepository';

interface IRequest {
  id_user: number;
  email: string;
}
@injectable()
export default class ShowProfileUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('FriendRequestsRepository')
    private friendRequestsRepository: IFriendRequestsRepository,
  ) {}

  async execute({ email, id_user }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmailWithFullProfile(email);
    if (!user) {
      throw new AppError('Profile not found', 404);
    }

    if (user.id !== id_user) {
      const requestFriend =
        await this.friendRequestsRepository.findByUserAndUserRequired(
          id_user,
          user.id,
        );
      Object.assign(user, {
        isRequested: !!requestFriend,
      });
    }

    return user;
  }
}
