import { Router } from 'express';
import AccountGameController from '../controllers/AccountGameController';

const accountGameRouter = Router();

const accountGameController = new AccountGameController();

accountGameRouter.get('/', accountGameController.index);

export default accountGameRouter;
