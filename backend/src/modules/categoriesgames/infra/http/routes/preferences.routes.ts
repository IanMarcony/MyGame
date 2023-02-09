import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PreferenceController from '../controllers/PreferenceController';

const preferencesRouter = Router();

const preferenceController = new PreferenceController();

preferencesRouter.put('/', ensureAuthenticated, preferenceController.update);

export default preferencesRouter;
