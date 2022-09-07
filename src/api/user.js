import request from '@/utils/request'
/**
 *
 * @param {String} mobile
 * @param {Number} code
 * @returns Promise
 */
export const Login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

export const sendCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
