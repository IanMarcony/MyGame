import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  id_post: number;
}

@injectable()
export default class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ id_post }: IRequest): Promise<void> {
    const post = await this.postsRepository.findById(id_post);

    if (!post) {
      throw new AppError('Post already has been deleted');
    }

    const { filesPost } = post;

    for (const file of filesPost) {
      await this.storageProvider.deleteFile(file.filename);
    }

    await this.postsRepository.delete(id_post);
  }
}
