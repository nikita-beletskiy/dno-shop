import { db, DatabaseResponseObject } from '../../db/db';
import { Router } from 'express';

const router = Router();

// getCurrentUser middleware augments Express.Request object so that it has a currentUser property. Then it checks whether or not there is a cookie set on that object. If there is some cookie, middleware tries to verify it. If there is no cookie or if verification fails req.currentUser remains undefined. If verification is successful its result gets assigned to req.currentUser. So response will always actual current user data or null if req.currentUser is undefined.
router.get('/api/users/currentuser', async (req, res) => {
  // If there is some cookie set on a client, but there is no corresponding user in DB (e.g. after DB restart) currentUser will be undefined
  const fetchedUser = ((
    await db.query(`SELECT * FROM users WHERE user_email = $1`, [
      req.currentUser?.user_email
    ])
  ).rows[0] as unknown) as DatabaseResponseObject;

  fetchedUser
    ? res.send({
        // Here I get an array of fetchedUser object keys and filter it to exclude 'user_password' key. Then I invoke reduce() method on filtered array and create a new object out of its values
        currentUser: Object.keys(fetchedUser)
          .filter(key => key !== 'user_password')
          .reduce((obj: DatabaseResponseObject, key) => {
            obj[key] = fetchedUser[key];
            return obj;
          }, {})
      })
    : res.send({ currentUser: null });
});

export { router as currentUserRouter };
