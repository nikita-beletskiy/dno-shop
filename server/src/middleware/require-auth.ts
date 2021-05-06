import { db } from '../db/db';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const throwNotAuthorized = () =>
    next(
      new NotAuthorizedError(
        `Whatever you're trying to access - first log in properly, please`
      )
    );

  !req.currentUser
    ? throwNotAuthorized()
    : db
        .query(`SELECT id FROM users WHERE id = $1`, [req.currentUser?.id])
        .then(result => (result.rows[0] ? next() : throwNotAuthorized()))
        .catch(err => next(new Error(err.message)));
};
