import { Strategy } from 'passport-local';
import { sequelize } from '../../models';
import { cryptPassword } from './common';

export default new Strategy({ usernameField: 'email' }, async (username, password, done) => {
  const user = await sequelize.models.User.findOne({ where: {
      email: username,
      password: cryptPassword(password)
    }
  });

  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
})

