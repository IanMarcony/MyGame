import ICreateFriendRequestDTO from '../dtos/ICreateFriendRequestDTO';
import FriendRequest from '../infra/typeorm/entities/FriendRequest';

export default interface IFriendRequestsRepository {
  create(data: ICreateFriendRequestDTO): Promise<FriendRequest>;
  deleteById(id_request: number): Promise<void>;
  findByUserAndUserRequired(
    id_user: number,
    id_user_required: number,
  ): Promise<FriendRequest | null>;
  findAll(id_user: number): Promise<FriendRequest[]>;
  findById(id: number): Promise<FriendRequest | null>;
}
