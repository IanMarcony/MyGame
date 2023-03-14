import ICreatePostDTO from '../dtos/ICreatePostDTO';
import Post from '../infra/typeorm/entities/Post';

interface IPostPage {
  posts: Post[];
  count: number;
}

export default interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  update(data: Post): Promise<Post>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Post | null>;
  findByIdAll(id: number): Promise<Post | null>;
  updateLikesCountById(id: number, action: 'UNLIKE' | 'LIKE'): Promise<void>;
  findByPageOrUser(page: number, id_user?: number): Promise<IPostPage>;
}

