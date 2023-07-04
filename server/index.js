const express = require('express')
const morgan = require('morgan');

const jwt = require('./lib/jwt')
const db = require('./lib/db')
const {auth} = require('./lib/auth')
const {genKey, getAuthenticatorUrl, checkCode} = require('./lib/totp')

const app = express();
app.use(express.json())

app.use(morgan('tiny'))

app.get('/', (req, res) => {
  db.printUsers()
  res.send({})
})

app.post('/login', (req, res, next) => {
  const {email, password} = req.body;

  const user = db.findUser({email})
  if (!user || user.password != password) {
    return next({
      code: 403,
      message: 'Invalid login credentials'
    })
  }

  const token = jwt.sign({
    sub: user.id,
    typ: 'temp-login'
  })

  res.send({
    token,
    typ: 'temp-login'
  })
})

app.get('/get-totp-qrcode', auth, (req, res, next) => {
  const key = req.user.totpKey || genKey();
  if (!req.user.totpKey) {
    db.updateUserById(req.user.id, {
      totpKey: key
    })
  }
  return res.send({
    url: getAuthenticatorUrl({key, user: req.user})
  })
})

app.post('/verify-totp', auth, (req, res, next) => {
  if (!req.body.code) {
    return next({
      code: 400,
      message: 'TOTP code is invalid'
    })
  }

  if (!checkCode({key: req.user.totpKey, userProvidedCode: req.body.code})) {
    return next({
      code: 400,
      message: 'TOTP code does not match'
    })
  }

  const token = jwt.sign({
    sub: user.id,
    typ: 'access-token'
  })

  return res.send({
    token,
    typ: 'access-token'
  })
});

app.get('/user-info', auth, (req, res, next) => {
  return res.send({
    user: req.user
  })
})

app.use((req, res, next) => {
  next({
    code: 404
  })
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.code || 500).json({
    message: err.message || 'Unknown error',
    err: err
  })
})

app.listen(4500, () => {
  console.log('Server listening on port 4500')
})