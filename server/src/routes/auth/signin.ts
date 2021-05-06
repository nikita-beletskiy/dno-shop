import { DatabaseResponseObject, db } from '../../db/db';
import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Password } from '../../services/password';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

const router = Router();

router.post(
  '/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage(`We don't deal with guys like you`)
      .isLength({ max: 100 })
      .withMessage(`We couldn't allow you, that's for sure`),
    body('password').trim().notEmpty().withMessage(`Really?)`)
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(async result => {
        const fetchedUser = (result
          .rows[0] as unknown) as DatabaseResponseObject;

        if (!fetchedUser)
          return next(
            new BadRequestError(
              `Looks like you're not yet in the club, buddy) We're so glad to see you, but go sign up first`,
              'email'
            )
          );
        else if (
          !(await Password.compare(fetchedUser.password as string, password))
        )
          return next(new BadRequestError('Check your password', 'password'));
        else {
          req.session = {
            jwt: jwt.sign(
              {
                id: fetchedUser.id
              },
              process.env.JWT_KEY!
            )
          };

          // Here I get an array of fetchedUser object keys and filter it to exclude 'user_password' key. Then I invoke reduce() method on filtered array and create a new object out of its values
          res.send(
            Object.keys(fetchedUser)
              .filter(key => key !== 'password')
              .reduce((obj: DatabaseResponseObject, key) => {
                obj[key] = fetchedUser[key];
                return obj;
              }, {})
          );
        }
      })
      .catch(err => next(new Error(err.message)));
  }
);

export { router as signinRouter };
