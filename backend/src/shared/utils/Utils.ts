import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface VerifyTokenResponse {
  id: number;
}

export default class Utils {
  public verifyToken(auth: string): VerifyTokenResponse {
    const authHeader = auth;

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

      return { id: parseInt(sub) };
    } catch {
      throw new AppError('Invalid JWT token', 401);
    }
  }
}
