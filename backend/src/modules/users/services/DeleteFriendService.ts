import { inject, injectable } from 'tsyringe';
import IFriendsRepository from '../repositories/IFriendsRepository';

interface IRequest {
  id_user: number;
  id_friend: number;
}
@injectable()
export default class DeleteFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,
  ) {}

  async execute({ id_friend, id_user }: IRequest): Promise<void> {
    await this.friendsRepository.removeFriend(id_user, id_friend);
  }
}
