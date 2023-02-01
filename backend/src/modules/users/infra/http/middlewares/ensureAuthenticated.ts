import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }
  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) {
    throw new AppError('Token error', 401);
  }

  const [type, token] = parts;

  if (!/^Bearer$/i.test(type)) {
    throw new AppError('Token malformatted', 401);
  }

  try {
    const { secret } = authConfig.jwt;

    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    req.user = { id: parseInt(sub) };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
