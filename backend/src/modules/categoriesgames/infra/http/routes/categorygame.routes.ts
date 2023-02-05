import { Router } from 'express';
import CategoryGameController from '../controllers/CategoryGameController';

const categoriesRouter = Router();

const categoryGameController = new CategoryGameController();

categoriesRouter.get('/', categoryGameController.index);

export default categoriesRouter;
