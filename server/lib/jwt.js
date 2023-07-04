const jwt = require('jsonwebtoken');

const jwtSecret = 'superdupersecret';

const sign = (payload) => jwt.sign({ ...payload }, jwtSecret);

const verify = (token) => jwt.verify(token, jwtSecret)

module.exports = {
  sign,
  verify
}