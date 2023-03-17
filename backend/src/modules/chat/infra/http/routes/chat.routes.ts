import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ChatController from '../controllers/ChatController';
import MessageController from '../controllers/MessageController';

const chatRouter = Router();

const chatController = new ChatController();
const messageController = new MessageController();

chatRouter.post('/', ensureAuthenticated, chatController.create);

chatRouter.get('/', ensureAuthenticated, chatController.index);
chatRouter.get('/:token', ensureAuthenticated, chatController.show);

chatRouter.get(
  '/messages/:token',
  ensureAuthenticated,
  messageController.index,
);
chatRouter.post('/messages', ensureAuthenticated, messageController.create);

export default chatRouter;
