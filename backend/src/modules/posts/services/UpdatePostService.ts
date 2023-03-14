import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateFilePostDTO from '../dtos/ICreateFilePostDTO';
import Post from '../infra/typeorm/entities/Post';
import IFilesPostRepository from '../repositories/IFilesPostRepository';
import IPostsRepository from '../repositories/IPostsRepository';

interface IFile {
  id: number;
  filename: string;
  type: 'video' | 'image';
}

interface IRequest {
  id_post: number;
  description: string;
  is_private: boolean;
}

@injectable()
export default class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  async execute({ description, id_post, is_private }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(id_post);

    if (!post) {
      throw new AppError('Post not found');
    }

    post.is_private = is_private;
    post.description = description;

    await this.postsRepository.update(post);

    return post;
  }
}

