import { Strategy, ExtractJwt } from 'passport-jwt';
import { sequelize } from '../../models';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'PozhiloyPrivateKey',
}

export default new Strategy(options, async ({ id }, done) => {
  const user = await sequelize.models.User.findOne({ where: { id } });
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
})
