import 'dotenv/config';
import http from 'http';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import routes from './routes';

import uploadConfig from '@config/upload';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import { Server } from 'socket.io';
import '@shared/container';

const app = express();
app.use(
  cors({
    origin: 'http://154.53.35.101:8080',
  }),
);
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

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
  },
});

export { serverHttp, io };
