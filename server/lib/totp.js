// https://github.com/wuyanxin/totp.js/tree/master

const totp = require('totp.js')

const genKey = () => totp.randomKey();

const getAuthenticatorUrl = ({key, user}) => {
  let org = 'Sample TOTP service'
  return `otpauth://totp/${user.email}?issuer=${org}&secret=${key}`
}

const checkCode = ({key, userProvidedCode}) => {
  const _totp = new totp(key);
  return _totp.verify(userProvidedCode)
}

module.exports = {
  genKey,
  getAuthenticatorUrl,
  checkCode
}