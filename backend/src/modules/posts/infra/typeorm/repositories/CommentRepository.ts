import ICreateCommentDTO from '@modules/posts/dtos/ICreateCommentDTO';
import ICommentRepository from '@modules/posts/repositories/ICommentRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import CommentUser from '../entities/CommentUser';

export default class CommentRepository implements ICommentRepository {
  private ormRepository: Repository<CommentUser>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(CommentUser);
  }

  public async create(data: ICreateCommentDTO): Promise<CommentUser> {
    const comment = this.ormRepository.create(data);
    await this.ormRepository.save(comment);
    return comment;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  public async findByIdPost(id_post: number): Promise<CommentUser[]> {
    const comments = await this.ormRepository.find({ where: { id_post } });

    return comments;
  }
}
