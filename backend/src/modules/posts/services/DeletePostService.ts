import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICommentRepository from '../repositories/ICommentRepository';
import IFilesPostRepository from '../repositories/IFilesPostRepository';
import IInteractionsRepository from '../repositories/IInteractionsRepository';
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
    @inject('FilesPostRepository')
    private filesPostRepository: IFilesPostRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentRepository,
    @inject('InteractionsRepository')
    private interactionsRepository: IInteractionsRepository,
  ) {}

  async execute({ id_post }: IRequest): Promise<void> {
    const post = await this.postsRepository.findById(id_post);

    if (!post) {
      throw new AppError('Post already has been deleted');
    }

    const { filesPost } = post;

    await this.filesPostRepository.deleteByIdPost(id_post);

    for (const file of filesPost) {
      await this.storageProvider.deleteFile(file.filename);
    }

    await this.interactionsRepository.deleteByIdPost(id_post);

    await this.commentsRepository.deleteByIdPost(id_post);

    await this.postsRepository.delete(id_post);
  }
}
