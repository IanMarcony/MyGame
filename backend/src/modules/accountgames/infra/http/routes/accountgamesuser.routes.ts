import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AccountGameUserController from '../controllers/AccountGameUserController';

const accountGameUserRouter = Router();

const accountGameUserController = new AccountGameUserController();

accountGameUserRouter.get(
  '/',
  ensureAuthenticated,
  accountGameUserController.index,
);

accountGameUserRouter.put(
  '/',
  ensureAuthenticated,
  accountGameUserController.update,
);

export default accountGameUserRouter;
