import express from "express";
import User from "../lib/users";
import passport from "passport";
import { signJWT } from "../lib/authentication/common";

const router = express.Router();

router.post('/authenticate', passport.authenticate('local'), async (req, res, next) => {
  console.log('User: ', req.user);
  if (req.user) {
    const token = await signJWT(req.user);
    res.status(200).json({ token, status: 200 });
  } else {
    res.status(400).json({ message: 'Email or password not set' });
  }
});

router.post('/register', async ({ body: { email, password }}, res) => {
  const user = new User();
  const result = await user.registerUser(email, password);
  res.status(result.status).json(result);
});

module.exports = router;
