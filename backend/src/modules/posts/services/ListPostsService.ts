import { inject, injectable } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  id_user?: number;
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
  ) {}

  async execute({ page, id_user }: IRequest): Promise<IResponse> {
    const response = await this.postsRepository.findByPageOrUser(page, id_user);

    return response;
  }
}
