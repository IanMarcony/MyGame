import ICreateInteractionDTO from '@modules/posts/dtos/ICreateInteractionDTO';
import IInteractionsRepository from '@modules/posts/repositories/IInteractionsRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import ActionUser from '../entities/ActionUser';
import InteractionUser from '../entities/InteractionUser';

export default class InteractionsRepository implements IInteractionsRepository {
  private ormRepositoryInteraction: Repository<InteractionUser>;
  private ormRepositoryAction: Repository<ActionUser>;

  constructor() {
    this.ormRepositoryInteraction =
      AppDataSource.getRepository(InteractionUser);
    this.ormRepositoryAction = AppDataSource.getRepository(ActionUser);
  }
  public async deleteByIdPost(id_post: number): Promise<void> {
    await this.ormRepositoryInteraction
      .createQueryBuilder()
      .delete()
      .where('id_post = :id_post ', { id_post })
      .execute();
  }

  public async create({
    action_user,
    id_post,
    id_user,
  }: ICreateInteractionDTO): Promise<void> {
    const action = await this.ormRepositoryAction.findOne({
      where: { type: action_user },
    });

    const interaction = this.ormRepositoryInteraction.create({
      id_post,
      id_user,
      id_action_user: action?.id,
    });
    await this.ormRepositoryInteraction.save(interaction);
  }

  public async findByIdPost(id_post: number): Promise<InteractionUser[]> {
    return await this.ormRepositoryInteraction.find({ where: { id_post } });
  }

  public async findByAction(
    id_post: number,
    id_user: number,
    action: 'COMMENT' | 'LIKE',
  ): Promise<InteractionUser | null> {
    const actionUser = await this.ormRepositoryAction.findOne({
      where: { type: action },
    });

    return await this.ormRepositoryInteraction.findOne({
      where: { id_post, id_user, id_action_user: actionUser?.id },
    });
  }

  public async countByAction(
    id_post: number,
    id_user: number,
    action: 'COMMENT' | 'LIKE',
  ): Promise<number> {
    const actionUser = await this.ormRepositoryAction.findOne({
      where: { type: action },
    });

    return await this.ormRepositoryInteraction.count({
      where: { id_post, id_user, id_action_user: actionUser?.id },
    });
  }

  public async deleteWhereIdPostAndIdUser(
    id_post: number,
    id_user: number,
    action: 'COMMENT' | 'LIKE',
  ): Promise<void> {
    const actionUser = await this.ormRepositoryAction.findOne({
      where: { type: action },
    });

    await this.ormRepositoryInteraction
      .createQueryBuilder()
      .delete()
      .where(
        'id_post = :id_post and id_user = :id_user and id_action_user = :id_action_user',
        { id_post, id_user, id_action_user: actionUser?.id },
      )
      .execute();
  }
}

