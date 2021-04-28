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
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = ((
      await db.query(`SELECT * FROM users WHERE email = $1`, [email])
    ).rows[0] as unknown) as DatabaseResponseObject;
    if (!existingUser)
      return next(
        new BadRequestError(
          `Looks like you're not yet in the club, buddy) We're so glad to see you, but go sign up first`,
          'email'
        )
      );

    const passwordsMatch = await Password.compare(
      existingUser.password as string,
      password
    );
    if (!passwordsMatch)
      return next(new BadRequestError('Check your password', 'password'));

    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    // Sending user object the same way as in currentUser route handler
    res.status(200).send(
      Object.keys(existingUser)
        .filter(key => key !== 'password')
        .reduce((obj: DatabaseResponseObject, key) => {
          obj[key] = existingUser[key];
          return obj;
        }, {})
    );
  }
);

export { router as signinRouter };
