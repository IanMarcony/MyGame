import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoryGameController from '../controllers/CategoryGameController';

const categoriesRouter = Router();

const categoryGameController = new CategoryGameController();

categoriesRouter.get('/', ensureAuthenticated, categoryGameController.index);

export default categoriesRouter;
