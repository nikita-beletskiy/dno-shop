import { db, UserColumns } from '../../db/db';
import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';
import { User } from '../../entity/User';
import { getConnection, getRepository } from 'typeorm';

const router = Router();
router.patch(
  '/api/users/currentuser/update',
  requireAuth,
  [
    body('email')
      .optional()
      .isEmail()
      .withMessage(`Nah, to ugly email, yours is better`)
      .isLength({ max: User.maxEmailLength })
      .withMessage(`Oh come on, you're too complicated...`),
    body('password')
      .optional()
      .trim()
      .isLength({ min: 8 })
      .withMessage(`You shrunk it too much. Let's try set a better password`)
      .isLength({ max: User.maxPasswordLength })
      .withMessage(`It's too big even for me...`),
    body('first_name')
      .optional()
      .isLength({ min: 2 })
      .withMessage(`Don't get me wrong, but it's too short...`)
      .isLength({ max: User.maxFirstNameLength })
      .withMessage(
        `Don't think I can memorize this... How about settle on simply John?)`
      )
      .matches(/^[A-z А-я]+$/, 'g')
      .withMessage('Jeez! Are you some kind of robot or smth?'),
    body('last_name')
      .optional()
      .isLength({ min: 2 })
      .withMessage(`Don't get me wrong, but it's too short...`)
      .isLength({ max: User.maxLastNameLength })
      .withMessage(`What is it? Unfortunate wedding?`)
      .matches(/^[A-z А-я]+$/, 'g')
      .withMessage('Jeez! Why did you marry a webserver?'),
    body('nickname')
      .optional()
      .isLength({ min: 2 })
      .withMessage(`Tooooo simple, even for a nickname`)
      .isLength({ max: User.maxNicknameLength })
      .withMessage(
        `Nickname is meant to simplify thing, and what are you doing?`
      )
      .matches(/^[A-zА-я-_]+$/, 'g')
      .withMessage(
        'Only dashes and underscores are allowed, if you wanna spice it up. And no spaces either, btw'
      ),
    body('phone')
      .optional()
      .matches(/^[0-9]{10}$/, 'g')
      .withMessage(
        'What a nasty hacker) look at that)) Stop doing this and enter your real phone number. Or get out'
      )
  ],
  validateRequest, // Custom middleware that will inspect 'req' object after 'body' function checked it for incorrect data and possibly set some errors on it
  [
    // This validation step involves DB query, so it'll be made only after previous validation steps were completed without issues, which guarantees that the query will be made with 100% valid data so it won't be wasteful
    body(['email', 'nickname', 'phone']).custom(
      async (value, { req, path }) => {
        if (
          (
            await getRepository(User)
              .createQueryBuilder()
              .select(path)
              .where(`${path} = :value`, { value })
              .andWhere('id NOT IN (:id)', { id: req.currentUser.id })
              .execute()
          ).length
        )
          throw new Error(
            path === 'email'
              ? `We already have someone with this email. Is it you?`
              : path === 'nickname'
              ? `Somebody took this already... I'm sorry`
              : `We already have someone with this phone. Is it you?`
          );
      }
    )
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    getConnection()
      .createQueryBuilder()
      .update<User>(User, { ...req.body })
      .where('id = :id', { id: req.currentUser!.id })
      .returning(Object.keys(req.body).filter(key => key !== 'password'))
      .execute()
      .then(result => res.send(...result.raw))
      .catch(err => next(new Error(err.message)));
  }
);

export { router as updateAccountRouter };
