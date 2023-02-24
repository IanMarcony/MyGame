import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CommentUser from '../infra/typeorm/entities/CommentUser';
import ICommentRepository from '../repositories/ICommentRepository';
import IInteractionsRepository from '../repositories/IInteractionsRepository';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  id_post: number;
  id_user: number;
  text: string;
}

@injectable()
export default class CreateCommentOnPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentRepository,
    @inject('InteractionsRepository')
    private interactionsRepository: IInteractionsRepository,
  ) {}

  async execute({ id_post, id_user, text }: IRequest): Promise<CommentUser> {
    const postExists = await this.postsRepository.findById(id_post);

    if (!postExists) {
      throw new AppError('Post not found', 404);
    }

    const comment = await this.commentsRepository.create({
      id_post,
      id_user,
      text,
    });

    await this.interactionsRepository.create({
      id_post,
      id_user,
      action_user: 'COMMENT',
    });

    return comment;
  }
}
