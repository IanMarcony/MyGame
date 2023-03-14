import ICreateInteractionDTO from '../dtos/ICreateInteractionDTO';
import InteractionUser from '../infra/typeorm/entities/InteractionUser';

export default interface IInteractionsRepository {
  create(data: ICreateInteractionDTO): Promise<void>;
  findByIdPost(id_post: number): Promise<InteractionUser[]>;
  findByAction(
    id_post: number,
    id_user: number,
    action: 'COMMENT' | 'LIKE',
  ): Promise<InteractionUser | null>;
  countByAction(
    id_post: number,
    id_user: number,
    action: 'COMMENT' | 'LIKE',
  ): Promise<number>;
  deleteWhereIdPostAndIdUser(
    id_post: number,
    id_user: number,
    action: 'COMMENT' | 'LIKE',
  ): Promise<void>;
  deleteByIdPost(id_post: number): Promise<void>;
}
