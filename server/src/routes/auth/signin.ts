import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/User';
import { Password } from '../../services/password';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import { getRepository } from 'typeorm';

const router = Router();

router.post(
  '/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage(`We don't deal with guys like you`)
      .isLength({ max: User.maxEmailLength })
      .withMessage(`We couldn't allow you, that's for sure`),
    body('password').trim().notEmpty().withMessage(`Really?)`)
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    getRepository(User)
      .findOne({ email })
      .then(async user => {
        if (!user)
          return next(
            new BadRequestError(
              `Looks like you're not yet in the club, buddy) We're so glad to see you, but go sign up first`,
              'email'
            )
          );
        else if (!(await Password.compare(user.password!, password)))
          return next(new BadRequestError('Check your password', 'password'));
        else {
          req.session = {
            jwt: jwt.sign({ id: user.id }, process.env.JWT_KEY!)
          };

          res.send(User.removePassword(user));
        }
      })
      .catch(err => next(new Error(err.message)));
  }
);

export { router as signinRouter };
