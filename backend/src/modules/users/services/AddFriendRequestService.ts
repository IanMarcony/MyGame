import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IFriendRequestsRepository from '../repositories/IFriendRequestsRepository';

interface IRequest {
  id_user: number;
  email_friend: string;
}
@injectable()
export default class AddFriendRequestService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('FriendRequestsRepository')
    private friendRequestsRepository: IFriendRequestsRepository,
  ) {}

  async execute({
    id_user: id_user_requester,
    email_friend,
  }: IRequest): Promise<void> {
    const userFriend = await this.usersRepository.findByEmail(email_friend);
    if (!userFriend) {
      throw new AppError('Profile not found', 404);
    }

    const requestAlreadyExist =
      await this.friendRequestsRepository.findByUserAndUserRequired(
        id_user_requester,
        userFriend.id,
      );
    if (requestAlreadyExist) {
      throw new AppError('Request already exists');
    }

    await this.friendRequestsRepository.create({
      id_user_requester,
      id_user_required: userFriend.id,
    });
  }
}
