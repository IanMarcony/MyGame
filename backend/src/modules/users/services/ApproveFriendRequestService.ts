import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFriendRequestsRepository from '../repositories/IFriendRequestsRepository';
import IFriendsRepository from '../repositories/IFriendsRepository';

interface IRequest {
  id_request: number;
}
@injectable()
export default class ApproveFriendRequestService {
  constructor(
    @inject('FriendRequestsRepository')
    private friendRequestsRepository: IFriendRequestsRepository,
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,
  ) {}

  async execute({ id_request }: IRequest): Promise<void> {
    const requestFriend = await this.friendRequestsRepository.findById(
      id_request,
    );
    if (!requestFriend) {
      throw new AppError('Friend request not found');
    }

    await this.friendsRepository.addFriend(
      requestFriend.id_user_requester,
      requestFriend.id_user_required,
    );

    await this.friendRequestsRepository.deleteById(id_request);
  }
}
