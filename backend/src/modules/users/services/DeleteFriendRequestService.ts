import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFriendRequestsRepository from '../repositories/IFriendRequestsRepository';

interface IRequest {
  id_request: number;
}
@injectable()
export default class DeleteFriendRequestService {
  constructor(
    @inject('FriendRequestsRepository')
    private friendRequestsRepository: IFriendRequestsRepository,
  ) {}

  async execute({ id_request }: IRequest): Promise<void> {
    const requestFriend = await this.friendRequestsRepository.findById(
      id_request,
    );
    if (!requestFriend) {
      throw new AppError('Friend request not found');
    }

    await this.friendRequestsRepository.deleteById(id_request);
  }
}
