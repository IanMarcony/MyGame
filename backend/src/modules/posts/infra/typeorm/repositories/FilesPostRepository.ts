import ICreateFilePostDTO from '@modules/posts/dtos/ICreateFilePostDTO';
import IFilesPostRepository from '@modules/posts/repositories/IFilesPostRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import FilePost from '../entities/FilePost';

export default class FilesPostRepository implements IFilesPostRepository {
  private ormRepository: Repository<FilePost>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(FilePost);
  }

  public async create(datas: ICreateFilePostDTO[]): Promise<FilePost[]> {
    const files = this.ormRepository.create(datas);
    await this.ormRepository.save(files);
    return files;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  public async findById(id: number): Promise<FilePost | null> {
    const comments = await this.ormRepository.findOne({ where: { id } });

    return comments;
  }
}
