import IFriendsRepository from '@modules/users/repositories/IFriendsRepository';
import { inject, injectable } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  id_user?: number;
  id_user_logged: number;
  page: number;
}

interface IResponse {
  posts: Post[];
  count: number;
}

@injectable()
export default class ListPostsServices {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,
  ) {}

  async execute({
    page,
    id_user,
    id_user_logged,
  }: IRequest): Promise<IResponse> {
    const { posts, count } = await this.postsRepository.findByPageOrUser(
      page,
      id_user,
    );

    let response: IResponse = { posts: [], count };

    for (let index = 0; index < posts.length; index++) {
      const post = posts[index];

      delete post.user.password;
      delete post.user.id;
      delete post.user.url_banner_photo;
      delete post.user.birth_date;
      delete post.user.description;
      delete post.user.created_at;
      delete post.user.updated_at;

      Object.assign(post, { count_comments: post.coments.length });

      if (!post.is_private) {
        response.posts.push(post);
      } else {
        const { id_user: id_friend } = post;

        const isFriend = await this.friendsRepository.findFriend(
          id_user_logged,
          id_friend,
        );

        if (isFriend) {
          response.posts.push(post);
        }
      }
    }

    return response;
  }
}
