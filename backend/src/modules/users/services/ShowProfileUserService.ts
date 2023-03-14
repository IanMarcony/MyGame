import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IFriendRequestsRepository from '../repositories/IFriendRequestsRepository';
import IFriendsRepository from '../repositories/IFriendsRepository';

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
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,
  ) {}

  async execute({ email, id_user }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmailWithFullProfile(email);
    if (!user) {
      throw new AppError('Profile not found', 404);
    }

    if (user.id !== id_user) {
      const isFriend = await this.friendsRepository.findFriend(
        id_user,
        user.id,
      );

      Object.assign(user, {
        is_friend: isFriend,
      });
      if (!isFriend) {
        const requestFriend =
          await this.friendRequestsRepository.findByUserAndUserRequired(
            id_user,
            user.id,
          );
        Object.assign(user, {
          is_requested: !!requestFriend,
          id_request: requestFriend?.id,
        });
      }
    }

    return user;
  }
}
