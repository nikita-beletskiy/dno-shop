import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

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
    : getRepository(User)
        .findOne(req.currentUser.id)
        .then(user => (user ? next() : throwNotAuthorized()))
        .catch(err => next(new Error(err.message)));
};
