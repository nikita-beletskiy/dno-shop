import { Router, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
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
      .isLength({ max: User.maxEmailLength })
      .withMessage(`Oh come on, you're too complicated...`),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage(
        `You are not so worthless, trust me. Let's try set a better password`
      )
      .isLength({ max: User.maxPasswordLength })
      .withMessage(`It's too big even for me...`),
    body('first_name')
      .isLength({ min: 2 })
      .withMessage(`Don't get me wrong, but it's too short...`)
      .isLength({ max: User.maxFirstNameLength })
      .withMessage(
        `Don't think I can memorize this... How about settle on simply John or Jane?)`
      )
      .matches(/^[A-z А-я]+$/, 'g')
      .withMessage('Jeez! Are you some kind of robot or smth?'),
    body('last_name')
      .isLength({ min: 2 })
      .withMessage(`Don't get me wrong, but it's too short...`)
      .isLength({ max: User.maxLastNameLength })
      .withMessage(
        `Don't think I can memorize this... How about settle on simply Doe?)`
      )
      .matches(/^[A-z А-я]+$/, 'g')
      .withMessage('Jeez! Are you some kind of robot or smth?')
  ],
  validateRequest, // Custom middleware that will inspect 'req' object after 'body' function checked it for incorrect data and possibly set some errors on it
  [
    // This validation step involves DB query, so it'll be made only after previous validation steps were completed without issues, which guarantees that the query will be made with 100% valid data so it won't be wasteful
    body('email').custom(async email => {
      // DB connection error is handled automatically
      if ((await getRepository(User).find({ email })).length)
        // Throwing this generic error because validateRequest middleware will set all appropriate errors eventually
        throw new Error(
          `You forgot you're already in the club, buddy) Go sign in and have fun`
        );
    })
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, first_name, last_name } = req.body;

    getRepository(User)
      .save({
        email,
        password: await Password.toHash(password),
        first_name,
        last_name
      })
      .then(newUser => {
        req.session = {
          // Generate JWT and store it on req.session object that is created by cookie-session library. This object's data will be stored inside a cookie
          jwt: jwt.sign({ id: newUser.id }, process.env.JWT_KEY!)
        };
        res.send(User.removePassword(newUser));
      })
      .catch(err => next(new Error(err.message)));
  }
);

export { router as signupRouter };
