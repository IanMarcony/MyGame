import ICreateFriendRequestDTO from '@modules/users/dtos/ICreateFriendRequestDTO';
import IFriendRequestsRepository from '@modules/users/repositories/IFriendRequestsRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import FriendRequest from '../entities/FriendRequest';

export default class FriendRequestsRepository
  implements IFriendRequestsRepository
{
  private ormRepository: Repository<FriendRequest>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(FriendRequest);
  }

  public async create(data: ICreateFriendRequestDTO): Promise<FriendRequest> {
    const friendRequest = this.ormRepository.create(data);
    await this.ormRepository.save(friendRequest);
    return friendRequest;
  }

  public async deleteById(id_request: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: id_request })
      .execute();
  }

  public async findByUserAndUserRequired(
    id_user: number,
    id_user_required: number,
  ): Promise<FriendRequest | null> {
    return await this.ormRepository.findOne({
      where: { id_user_required, id_user_requester: id_user },
    });
  }

  public async findAll(id_user: number): Promise<FriendRequest[]> {
    return await this.ormRepository.find({
      where: { id_user_required: id_user },
    });
  }

  public async findById(id: number): Promise<FriendRequest | null> {
    return await this.ormRepository.findOne({ where: { id } });
  }
}
