import express from 'express';
import passport from 'passport'
import User from '../lib/users';

const router = express.Router();
const userService = new User();

router.get('/me', passport.authenticate('jwt'), async (req, res, next) => {
  if (req.user) {
    try {
      const viewUser = await userService.viewUser(req.user.id);
      res.status(200).json(viewUser)
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Oops... something went wrong' })
    }
  } else {
    res.status(403).json({ message: 'Not authorized' })
  }
});

router.get('/:id', async (req, res) => {
  const user = await userService.viewUser(req.params.id);
  if (user.email) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' })
  }
});


router.put('/:id', passport.authenticate('jwt'), async (req, res, next) => {
  const { user } = req;
  try {
    await userService.updateProfile(user, req.body.params)
    res.status(200).json({ message: 'Profile updated' })
  } catch (e) {
    res.status(400).json({ message: 'Oops... something went wrong' })
  }
});

router.get('/:id/rooms', async (req, res) => {
  // get rooms by user id
  // limit 20 for example
  // return it
});

router.post('', async (req, res) => {

});

module.exports = router;
