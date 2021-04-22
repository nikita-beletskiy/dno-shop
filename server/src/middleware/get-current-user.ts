import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Describes the data expected out of 'jwt.verify()'. Because email was initially encrypted, now it is in fact expected
interface UserPayload {
  user_email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
