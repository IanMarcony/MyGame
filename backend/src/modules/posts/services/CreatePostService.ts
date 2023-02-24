import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';
import IFilesPostRepository from '../repositories/IFilesPostRepository';
import ICreateFilePostDTO from '../dtos/ICreateFilePostDTO';

interface IFile {
  filename: string;
  type: 'video' | 'image';
}

interface IRequest {
  id_user: number;
  description: string;
  files: IFile[];
  is_private: boolean;
}

@injectable()
export default class CreatePostService {
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
    files,
    id_user,
    is_private,
  }: IRequest): Promise<Post> {
    const post = await this.postsRepository.create({
      description,
      id_user,
      is_private,
    });

    const { id: id_post } = post;
    const filesToSave: ICreateFilePostDTO[] = [];

    for (const file of files) {
      let filenameSaved = await this.storageProvider.saveFile(file.filename);
      filesToSave.push({
        ...file,
        filename: filenameSaved,
        id_post,
      });
    }

    const filesSaved = await this.filesPostRepository.create(filesToSave);
    Object.assign(post, {
      filesPost: filesSaved,
    });
    return post;
  }
}
