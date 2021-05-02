import { db, UserColumns } from '../../db/db';
import { Router } from 'express';

const router = Router();

// getCurrentUser middleware augments Express.Request object so that it has a currentUser property. Then it checks whether or not there is a cookie set on that object. If there is some cookie, middleware tries to verify it. If there is no cookie or if verification fails req.currentUser remains undefined. If verification is successful its result gets assigned to req.currentUser. So response will always actual current user data or null if req.currentUser is undefined.
router.get('/api/users/currentuser', async (req, res) => {
  // If there is some cookie set on a client, but there is no corresponding user in DB (e.g. after DB restart) currentUser will be undefined

  const columns = Object.keys(UserColumns)
    .filter(attr => attr !== UserColumns.password)
    .join();

  const fetchedUser = (
    await db.query(`SELECT ${columns} FROM users WHERE id = $1`, [
      req.currentUser?.id
    ])
  ).rows[0];

  fetchedUser
    ? res.send({ currentUser: fetchedUser })
    : res.send({ currentUser: null });
});

export { router as currentUserRouter };
