import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from '../../../data-source';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import routes from './routes';

import uploadConfig from '@config/upload';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import '@shared/container';

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/files', express.static(uploadConfig.uploadsFolder));

    app.use(routes);

    app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return res
          .status(err.statusCode)
          .json({ status: 'error', message: err.message });
      }

      console.log(err);

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    });

    return app.listen(process.env.API_PORT as unknown as number | 3333, () =>
      console.log(
        `🚀 Server rodando! Acesse: http://localhost:${process.env.API_PORT}`,
      ),
    );
  })
  .catch((error) => console.log(error));
