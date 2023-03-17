import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from '../../../data-source';
import 'express-async-errors';
import { serverHttp } from './http';
import '../websocket';

AppDataSource.initialize()
  .then(() => {
    return serverHttp.listen(
      process.env.API_PORT as unknown as number | 3333,
      () =>
        console.log(
          `🚀 Server rodando! Acesse: http://localhost:${process.env.API_PORT}`,
        ),
    );
  })
  .catch((error) => console.log(error));
