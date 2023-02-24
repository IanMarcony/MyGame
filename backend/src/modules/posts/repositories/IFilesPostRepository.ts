import ICreateFilePostDTO from '../dtos/ICreateFilePostDTO';
import FilePost from '../infra/typeorm/entities/FilePost';

export default interface IFilesPostRepository {
  create(datas: ICreateFilePostDTO[]): Promise<FilePost[]>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<FilePost | null>;
}
