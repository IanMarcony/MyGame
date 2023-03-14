import ICreateCommentDTO from '../dtos/ICreateCommentDTO';
import ComentUser from '../infra/typeorm/entities/CommentUser';

export default interface ICommentRepository {
  create(data: ICreateCommentDTO): Promise<ComentUser>;
  delete(id: number): Promise<void>;
  deleteByIdPost(id_post: number): Promise<void>;
  findByIdPost(id_post: number): Promise<ComentUser[]>;
}

