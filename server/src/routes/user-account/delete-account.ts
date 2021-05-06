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
      `DELETE FROM users WHERE id = $1 RETURNING email, firstName, lastName`,
      [req.currentUser?.id]
    )
      .then(result => {
        const deletedUser = (result
          .rows[0] as unknown) as DatabaseResponseObject;

        res.send({
          // Camel case names don't work, should be fixed
          response: `Account for user ${deletedUser.firstname} ${deletedUser.lastname} with email ${deletedUser.email} was successfully deleted! We will miss you af :(`
        });
      })
      .catch(err => next(new Error(err.message)));
  }
);

export { router as deleteAccountRouter };
