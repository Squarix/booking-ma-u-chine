import jwt from 'jsonwebtoken';
import crypto from 'crypto';


export function signJWT(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload.toJSON(), 'PozhiloyPrivateKey',
        { algorithm: 'HS256', expiresIn: 60 * 60 * 24 * 30 }, function (err, token) {
          if (err)
            reject(err);
          else
            resolve(token);
        });
  });
}

export function verifyJWT(token) {
  return new Promise(((resolve, reject) => {
    jwt.verify(token, 'PozhiloyPrivateKey', (err, decode) => {
      if (err)
        reject(err);
      else
        resolve(decode);
    })
  }));
}

export function cryptPassword(password) {
  let sha256 = crypto.createHash('sha256');
  sha256.update(password, 'utf8');
  return sha256.digest('base64');
}
