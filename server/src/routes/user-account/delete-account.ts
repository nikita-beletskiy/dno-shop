import { Router } from 'express';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';

const router = Router();
router.delete(
  '/api/users/currentuser/delete',
  requireAuth,
  validateRequest,
  (req, res, next) => {
    getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: req.currentUser!.id })
      .returning(['email', 'first_name', 'last_name'])
      .execute()
      .then(result =>
        res.send({
          response: `Account for user ${result.raw[0].first_name} ${result.raw[0].last_name} with email ${result.raw[0].email} was successfully deleted! We will miss you af :(`
        })
      )
      .catch(err => next(new Error(err.message)));
  }
);

export { router as deleteAccountRouter };
