import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  filename_profile_photo: string;
  filename_banner_photo: string;
  id_user: number;
}

@injectable()
export default class UpdateProfileAndBannerPhotoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    filename_banner_photo,
    filename_profile_photo,
    id_user,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError(
        'Only authenticated users can change banner and profile.',
        401,
      );
    }

    if (user.url_banner_photo) {
      await this.storageProvider.deleteFile(user.url_banner_photo);
    }

    if (user.url_profile_photo) {
      await this.storageProvider.deleteFile(user.url_profile_photo);
    }

    if (filename_profile_photo) {
      const profile_image_filename = await this.storageProvider.saveFile(
        filename_profile_photo,
      );
      user.url_profile_photo = profile_image_filename;
    }

    if (filename_banner_photo) {
      const banner_image_filename = await this.storageProvider.saveFile(
        filename_banner_photo,
      );

      user.url_banner_photo = banner_image_filename;
    }

    await this.usersRepository.update(user);

    return user;
  }
}
