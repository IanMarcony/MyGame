import { inject, injectable } from 'tsyringe';
import ICommentRepository from '../repositories/ICommentRepository';
import IInteractionsRepository from '../repositories/IInteractionsRepository';

interface IRequest {
  id_comment: number;
  id_post: number;
  id_user: number;
}

@injectable()
export default class DeleteCommentOnPostService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentRepository,
    @inject('InteractionsRepository')
    private interactionsRepository: IInteractionsRepository,
  ) {}

  async execute({ id_comment, id_post, id_user }: IRequest): Promise<void> {
    await this.commentsRepository.delete(id_comment);
    await this.interactionsRepository.deleteWhereIdPostAndIdUser(
      id_post,
      id_user,
      'COMMENT',
    );
  }
}
