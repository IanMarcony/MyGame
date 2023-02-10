import UpdateProfileAndBannerPhotoService from '@modules/users/services/UpdateProfileAndBannerPhotoService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileBannerUserController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id: id_user } = req.user;

    const imagesUploaded = req.files
      ? (req.files as Express.Multer.File[])
      : ['', ''];

    let profile_image: File | undefined = imagesUploaded.find(
      (item: Express.Multer.File) => item.fieldname === 'profile_image',
    );
    let banner_image: File | undefined = imagesUploaded.find(
      (item: Express.Multer.File) => item.fieldname === 'banner_image',
    );

    const updateProfileBanner = container.resolve(
      UpdateProfileAndBannerPhotoService,
    );

    const user = await updateProfileBanner.execute({
      filename_banner_photo: banner_image?.filename || undefined,
      filename_profile_photo: profile_image?.filename || undefined,
      id_user,
    });

    delete user.password;
    delete user.id;

    return res.status(200).json(user);
  }
}
