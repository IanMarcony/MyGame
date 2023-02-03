import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import accountGameRouter from '@modules/accountgames/infra/http/routes/accountgame.routes';
import accountGameUserRouter from '@modules/accountgames/infra/http/routes/accountgamesuser.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/accountgames', accountGameRouter);
routes.use('/accountgames/users', accountGameUserRouter);

export default routes;
