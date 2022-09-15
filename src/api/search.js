import request from '@/utils/request'
/**
 * 获取搜索关键词
 * @param {String} q
 * @returns Promise
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getResultsAPI = (/* eslint-disable-line */ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
