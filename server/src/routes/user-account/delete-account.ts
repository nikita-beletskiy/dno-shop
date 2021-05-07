import { DatabaseResponseObject, db } from '../../db/db';
import { Router } from 'express';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';

const router = Router();
router.delete(
  '/api/users/currentuser/delete',
  requireAuth,
  validateRequest, // Custom middleware that will inspect 'req' object after 'body' function checked it for incorrect data and possibly set some errors on it
  (req, res, next) => {
    db.query(
      `DELETE FROM users WHERE id = $1 RETURNING email, first_name, last_name`,
      [req.currentUser?.id]
    )
      .then(result => {
        const deletedUser = (result
          .rows[0] as unknown) as DatabaseResponseObject;

        req.session = null;

        res.send({
          response: `Account for user ${deletedUser.first_name} ${deletedUser.last_name} with email ${deletedUser.email} was successfully deleted! We will miss you af :(`
        });
      })
      .catch(err => next(new Error(err.message)));
  }
);

export { router as deleteAccountRouter };
