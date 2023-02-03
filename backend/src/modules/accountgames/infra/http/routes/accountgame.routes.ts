import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AccountGameController from '../controllers/AccountGameController';

const accountGameRouter = Router();

const accountGameController = new AccountGameController();

accountGameRouter.get('/', ensureAuthenticated, accountGameController.index);

export default accountGameRouter;
