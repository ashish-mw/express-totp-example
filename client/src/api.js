import axios from 'axios';

const apiDomain = 'http://localhost:4500';

export const login = (payload) => {
  return axios.post(`${apiDomain}/login`, payload)
}

export const getQrCode = (token) => {
  return axios.get(`${apiDomain}/get-totp-qrcode`, {
    headers: {
      Authorization: 'Bearer '+token
    }
  })
}

export const verifyTOTP = ({token, payload}) => {
  return axios.post(`${apiDomain}/verify-totp`, payload, {
    headers: {
      Authorization: 'Bearer '+token
    }
  })
}

export const userInfo = (token) => {
  return axios.get(`${apiDomain}/user-info`, {
    headers: {
      Authorization: 'Bearer '+token
    }
  })
}