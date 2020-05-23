import { sequelize } from '../models';
import { cryptPassword, signJWT } from "./authentication/common";

export default class User {
  constructor() {
    this.model = sequelize.models.user;
  }

  registerUser = async (email, password) => {
    try {
      if (!(email && password)) {
        throw 'Email or password is not set';
      }
      if (password.length < 6) {
        throw 'Password is too short';
      }
      if (!validateEmail(email)) {
        throw 'Email address is incorrect';
      }
      console.log(this);
      const user = await this.model.create({ password: cryptPassword(password), email });
      return { token: await signJWT(user), status: 200 };
    } catch (e) {
      return { message: e, status: 400 };
    }
  }

  viewUser = id => this.model.findOne({ where: { id } });

  isUserModerator = ({ user }, res, next) => {
    if (user.type === 'moderator') {
      next();
    } else {
      res.status(403).json({message: 'You picked the wrong house fool'})
    }
  }

  updateProfile = (user, params) => this.model.update(params, { where: { id: user.id }})
}


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
