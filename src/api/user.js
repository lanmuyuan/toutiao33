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
/**
 *获取用户信息
 * @returns Promise
 */
export const getUserInfoApi = () => {
  return request({
    url: '/v1_0/user'
  })
}
/**
 *
 * @param {*} file 裁剪过后的图片file文件
 * @returns Promise
 */
export const uploadPhotoAPI = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
