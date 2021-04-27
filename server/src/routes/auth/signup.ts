import { db, DatabaseResponseObject } from '../../db/db';
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middleware/validate-request';
import { Password } from '../../services/password';

const router = Router();
router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage(
        `I'm not as stupid as you might think) Please enter your real email`
      )
      .isLength({ max: 100 })
      .withMessage(`Oh come on, you're too complicated...`)
      .custom(async email => {
        if (
          (await db.query(`SELECT * FROM users WHERE email = $1`, [email]))
            .rows[0]
        )
          // Throwing this generic error because validateRequest middleware will set all appropriate errors eventually
          throw new Error(
            `You forgot you're already in the club, buddy) Go sign in and have fun`
          );
      }),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage(
        `You are not so worthless, trust me. Let's try set a better password`
      )
      .isLength({ max: 255 })
      .withMessage(`It's too big even for me...`),
    body('firstName')
      .isLength({ min: 2 })
      .withMessage(`Don't get me wrong, but it's too short...`)
      .isLength({ max: 50 })
      .withMessage(
        `Don't think I can memorize this... How about settle on simply John?)`
      )
      .matches(/^[A-z А-я]+$/, 'g')
      .withMessage('Jeez! Are you some kind of robot or smth?')
  ],
  validateRequest, // Custom middleware that will inspect 'req' object after 'body' function checked it for incorrect data and possibly set some errors on it
  async (req: Request, res: Response) => {
    const { email, password, firstName } = req.body;

    const savedUser = ((
      await db.query(
        `INSERT INTO users (email, password, firstName, nickname) VALUES ($1, $2, $3, $3) RETURNING *`,
        [email, await Password.toHash(password), firstName]
      )
    ).rows[0] as unknown) as DatabaseResponseObject;

    // Generate JWT - payload as a first argument and a signing key as the second
    const userJwt = jwt.sign({ email: savedUser.email }, process.env.JWT_KEY!);

    // Store JWT on req.session object that is created by cookie-session library. This object's data will be stored inside a cookie
    req.session = { jwt: userJwt };

    res.status(201).send(savedUser);
  }
);

export { router as signupRouter };
