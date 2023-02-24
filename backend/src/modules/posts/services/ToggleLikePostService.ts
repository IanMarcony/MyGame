import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInteractionsRepository from '../repositories/IInteractionsRepository';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  id_post: number;
  id_user: number;
}

@injectable()
export default class ToggleLikePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('InteractionsRepository')
    private interactionsRepository: IInteractionsRepository,
  ) {}

  async execute({ id_post, id_user }: IRequest): Promise<void> {
    const post = await this.postsRepository.findById(id_post);

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    const isLiked = await this.interactionsRepository.findByAction(
      id_post,
      id_user,
      'LIKE',
    );

    if (isLiked) {
      await this.interactionsRepository.deleteWhereIdPostAndIdUser(
        id_post,
        id_user,
        'LIKE',
      );
    } else {
      await this.interactionsRepository.create({
        id_post,
        id_user,
        action_user: 'LIKE',
      });
    }

    this.interactionsRepository
      .findAllByAction(id_post, id_user, 'LIKE')
      .then((count) => {
        post.count_likes = count;
        this.postsRepository.update(post);
      });
  }
}
