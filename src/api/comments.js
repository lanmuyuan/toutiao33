import request from '@/utils/request'
/**
 * 获取评论或评论回复
 * @param {String} type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {String} source 源id，文章id或评论id
 * @param {String} offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {Number} limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const getCommentsAPI = (type, source, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: { type, source, offset, limit }
  })
}
/**
 * 对文章或者评论进行评论
 * @param {String} target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {String} content 评论内容
 * @param {String} art_id 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns Promise
 */
export const addCommentsAPI = (
  target,
  content,
  /* eslint-disable-line */ art_id
) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: { target, content, art_id }
  })
}
