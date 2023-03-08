import { Router } from 'express';
import FriendController from '../controllers/FriendController';
import FriendRequestController from '../controllers/FriendRequestController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const friendRouter = Router();

const friendController = new FriendController();

const friendRequestController = new FriendRequestController();

friendRouter.delete('/remove', ensureAuthenticated, friendController.delete);
friendRouter.delete(
  '/request',
  ensureAuthenticated,
  friendRequestController.delete,
);
friendRouter.post(
  '/request',
  ensureAuthenticated,
  friendRequestController.create,
);
friendRouter.put(
  '/request',
  ensureAuthenticated,
  friendRequestController.update,
);

export default friendRouter;
