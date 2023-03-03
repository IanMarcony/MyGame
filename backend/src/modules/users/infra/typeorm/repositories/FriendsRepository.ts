import IFriendsRepository from '@modules/users/repositories/IFriendsRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import Friend from '../entities/Friend';

export default class FriendsRepository implements IFriendsRepository {
  private ormRepository: Repository<Friend>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Friend);
  }

  public async addFriend(
    id_requester: number,
    id_requested: number,
  ): Promise<void> {
    const friendConnection = this.ormRepository.create([
      {
        id_user: id_requester,
        id_friend: id_requested,
      },
      { id_user: id_requested, id_friend: id_requester },
    ]);
    await this.ormRepository.save(friendConnection);
  }

  public async removeFriend(
    id_requester: number,
    id_requested: number,
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id_user = :id_user and id_friend =  :id_friend', {
        id_user: id_requester,
        id_friend: id_requested,
      })
      .execute();

    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id_user = :id_user and id_friend =  :id_friend', {
        id_user: id_requested,
        id_friend: id_requester,
      })
      .execute();
  }

  public async findFriend(
    id_user: number,
    id_friend: number,
  ): Promise<boolean> {
    const friendConnection = await this.ormRepository.findOne({
      where: { id_user, id_friend },
    });

    return !!friendConnection;
  }
}
