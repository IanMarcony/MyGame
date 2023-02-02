import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileBannerUserController from '../controllers/ProfileBannerUserController';

const usersRouter = Router();

const upload = multer(uploadConfig);

const usersController = new UsersController();
const profileBannerUserController = new ProfileBannerUserController();

usersRouter.post('/', usersController.create);
usersRouter.put('/', ensureAuthenticated, usersController.update);
usersRouter.patch(
  '/images',
  ensureAuthenticated,
  upload.any(),
  profileBannerUserController.update,
);

export default usersRouter;
