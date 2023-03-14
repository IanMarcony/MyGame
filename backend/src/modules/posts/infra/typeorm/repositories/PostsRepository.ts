import { IsNull, Not, Repository } from 'typeorm';
import { AppDataSource } from 'data-source';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import Post from '../entities/Post';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import Constants from '@shared/utils/Contants';

interface IPostPage {
  posts: Post[];
  count: number;
}

export default class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Post);
  }
  public async updateLikesCountById(
    id: number,
    action: 'LIKE' | 'UNLIKE',
  ): Promise<void> {
    if (action === 'LIKE') {
      await this.ormRepository.increment({ id }, 'count_likes', 1);
    } else {
      await this.ormRepository.decrement({ id }, 'count_likes', 1);
    }
  }
  public async create(data: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create(data);
    await this.ormRepository.save(post);

    return post;
  }
  public async update(data: Post): Promise<Post> {
    return await this.ormRepository.save(data);
  }
  public async delete(id: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
  public async findById(id: number): Promise<Post | null> {
    const post = await this.ormRepository.findOne({
      where: { id },
      relations: {
        filesPost: true,
      },
    });

    return post;
  }
  public async findByPageOrUser(
    page: number,
    id_user?: number | undefined,
  ): Promise<IPostPage> {
    if (id_user === 0) {
      return {
        posts: [],
        count: 0,
      };
    }

    const take = Constants.limitPostPerPage;
    const skip = (page - 1) * take;

    const [posts, count] = await this.ormRepository.findAndCount({
      take,
      skip,
      order: { created_at: 'DESC' },
      where: {
        id_user: id_user ? id_user : Not(IsNull()),
      },
      relations: {
        interactions: {
          action_user: true,
        },
        coments: { user: true },
        filesPost: true,
        user: true,
      },
    });

    return {
      posts,
      count,
    };
  }
}

