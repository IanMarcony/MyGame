import { Router } from 'express';
import CommentsController from '../controllers/CommentsController';
import LikesController from '../controllers/LikesController';
import PostsController from '../controllers/PostsController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const postsRouter = Router();

const commentController = new CommentsController();
const likesController = new LikesController();
const postsController = new PostsController();
const upload = multer(uploadConfig);

postsRouter.get('/:page', ensureAuthenticated, postsController.index);
postsRouter.post(
  '/',
  ensureAuthenticated,
  upload.any(),
  postsController.create,
);
postsRouter.delete('/', ensureAuthenticated, postsController.delete);
postsRouter.put('/', ensureAuthenticated, upload.any(), postsController.update);
postsRouter.post('/comments', ensureAuthenticated, commentController.create);
postsRouter.delete('/comments', ensureAuthenticated, commentController.delete);
postsRouter.put('/likes', ensureAuthenticated, likesController.update);

export default postsRouter;
