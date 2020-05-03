import passport from 'passport';
import JWTStrategy from './jwt.strategy';
import LocalStrategy from './local.strategy';


passport.use(JWTStrategy);
passport.use(LocalStrategy);

passport.serializeUser(function (user, done) {
  done(null, user);
})

passport.deserializeUser(function (user, done) {
  done(null, user);
})

export default passport;
