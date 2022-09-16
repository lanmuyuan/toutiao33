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
/**
 * 获取文章详情
 * @param {String} id 文章id
 * @returns Promise
 */
export const getArticlesDetailsAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
/**
 * 收藏文章
 * @param {Number} id 收藏的目标文章id
 * @returns Promise
 */
export const setCollectionsAPI = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}
/**
 * 取消收藏文章
 * @param {Number} id 取消收藏的目标文章id
 * @returns Promise
 */
export const deleteCollectionsAPI = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
}
