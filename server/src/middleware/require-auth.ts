import { db } from '../db/db';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  !req.currentUser ||
  !(await db.query(`SELECT * FROM users WHERE id = $1`, [req.currentUser?.id]))
    .rows[0]
    ? next(
        new NotAuthorizedError(
          `Whatever you're trying to access - first log in properly, please`
        )
      )
    : next();
};
