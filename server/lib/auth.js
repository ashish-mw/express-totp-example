const jwt = require('./jwt')
const {findUser} = require('./db');

const auth = (req, res, next) => {
  let header = req.headers['authorization'];
  if (!header) {
    return next({
      code: 403,
      message: 'Token not found'
    })
  }

  const tokenSplits = header.split('Bearer ');
  const token = tokenSplits[1];
  if (!token) {
    return next({
      code: 403,
      message: 'Token header is invalid'
    })
  }

  const verified = jwt.verify(token);
  req.user = findUser({id: verified.sub});

  next()
}

module.exports = {
  auth
}