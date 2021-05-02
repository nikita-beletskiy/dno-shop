import { db } from '../../db/db';
import { Router, Request, Response } from 'express';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';

const router = Router();
router.delete(
  '/api/users/currentuser/delete',
  requireAuth,
  validateRequest, // Custom middleware that will inspect 'req' object after 'body' function checked it for incorrect data and possibly set some errors on it
  async (req: Request, res: Response) => {
    await db.query(`DELETE FROM users WHERE id = $1`, [req.currentUser?.id]);

    res.end();
  }
);

export { router as deleteAccountRouter };
