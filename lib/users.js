import { sequelize } from '../models';
import { cryptPassword, signJWT } from "./authentication/common";

function User() {
  this.model = sequelize.models.User;
}

User.prototype.model = sequelize.models.User;

User.prototype.registerUser = async function (email, password) {
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
};

User.prototype.viewUser = function (id) {
  return this.model.findOne({
    where: { id },
    attributes: ['id', 'email', 'first_name', 'last_name', 'phoneNumber', 'type']
  });
};

User.prototype.isUserModerator = (user, req, res, next) => {
  if (user.id && user.type === 'moderator') {
    req.user = user
    next()
  } else {
    res.status(403).json({message: 'You picked the wrong house fool'})
  }
};

User.prototype.updateProfile = function(user, params) {
  return this.model.update(params, { where: { id: user.id }});
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = User;
