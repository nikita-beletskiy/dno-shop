import { db, UserColumns } from '../../db/db';
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';

const router = Router();
router.patch(
  '/api/users/currentuser/update',
  requireAuth,
  [
    body('email')
      .optional()
      .isEmail()
      .withMessage(`Nah, to ugly email, yours is better`)
      .isLength({ max: 100 })
      .withMessage(`Oh come on, you're too complicated...`),
    body('password')
      .optional()
      .trim()
      .isLength({ min: 8 })
      .withMessage(`You shrunk it too much. Let's try set a better password`)
      .isLength({ max: 128 })
      .withMessage(`It's too big even for me...`),
    body('firstName')
      .optional()
      .isLength({ min: 2 })
      .withMessage(`Don't get me wrong, but it's too short...`)
      .isLength({ max: 50 })
      .withMessage(
        `Don't think I can memorize this... How about settle on simply John?)`
      )
      .matches(/^[A-z А-я]+$/, 'g')
      .withMessage('Jeez! Are you some kind of robot or smth?'),
    body('lastName')
      .optional()
      .isLength({ min: 2 })
      .withMessage(`Don't get me wrong, but it's too short...`)
      .isLength({ max: 50 })
      .withMessage(`What is it? Unfortunate wedding?`)
      .matches(/^[A-z А-я]+$/, 'g')
      .withMessage('Jeez! Why did you marry a webserver?'),
    body('nickname')
      .optional()
      .isLength({ min: 2 })
      .withMessage(`Tooooo simple, even for a nickname`)
      .isLength({ max: 20 })
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
          // Doesn't handle db connection errors (probably express validator bug)
          (
            await db.query(
              `SELECT ${path} FROM users WHERE ${path} = $1 AND id NOT IN ($2)`,
              [value, req.currentUser.id]
            )
          ).rows[0]
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
  async (req: Request, res: Response) => {
    const columns = Object.keys(req.body)
      .reduce((params: any, currentParam) => {
        params.push(`${currentParam} = '${req.body[currentParam]}'`);
        return params;
      }, [])
      .join();

    const updatedUser = (
      await db.query(
        `UPDATE users SET ${columns} WHERE id = $1 RETURNING ${Object.keys(
          UserColumns
        )
          .filter(attr => attr !== UserColumns.password)
          .join()}`,
        [req.currentUser?.id]
      )
    ).rows[0];

    res.send(updatedUser);
  }
);

export { router as updateAccountRouter };
