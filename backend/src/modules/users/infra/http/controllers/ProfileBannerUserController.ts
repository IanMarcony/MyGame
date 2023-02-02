import UpdateProfileAndBannerPhotoService from '@modules/users/services/UpdateProfileAndBannerPhotoService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileBannerUserController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id: id_user } = req.user;

    const [profile_image, banner_image] = req.files
      ? (req.files as Express.Multer.File[])
      : ['', ''];

    const updateProfileBanner = container.resolve(
      UpdateProfileAndBannerPhotoService,
    );

    const user = await updateProfileBanner.execute({
      filename_banner_photo: banner_image.filename,
      filename_profile_photo: profile_image.filename,
      id_user,
    });

    delete user.password;

    return res.status(200).json(user);
  }
}
