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
  files_to_delete: IFile[];
  files_to_save: IFile[];
  is_private: boolean;
}

@injectable()
export default class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('FilesPostRepository')
    private filesPostRepository: IFilesPostRepository,
  ) {}

  async execute({
    description,
    files_to_delete,
    files_to_save,
    id_post,
    is_private,
  }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(id_post);

    if (!post) {
      throw new AppError('Post not found');
    }

    for (const fileDelete of files_to_delete) {
      await this.filesPostRepository.delete(fileDelete.id);
      await this.storageProvider.deleteFile(fileDelete.filename);
    }
    const filesToSave: ICreateFilePostDTO[] = [];

    for (const file of files_to_save) {
      let filenameSaved = await this.storageProvider.saveFile(file.filename);
      filesToSave.push({
        ...file,
        filename: filenameSaved,
        id_post,
      });
    }

    if (filesToSave.length > 0) {
      const filesSaved = await this.filesPostRepository.create(filesToSave);
      Object.assign(post, {
        filesPost: filesSaved,
      });
    }

    post.is_private = is_private;
    post.description = description;

    await this.postsRepository.update(post);

    return post;
  }
}
