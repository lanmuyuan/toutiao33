import request from '@/utils/request'
/**
 * 获取文章
 * @param {String|Number} id
 * @param {String} timestamp
 * @returns Promise
 */
export const getArticlesAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
