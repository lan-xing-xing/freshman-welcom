import request from '@/utils/request'

export function postForm(params, data) {
  return request({
    url: params,
    method: 'post',
    data
  })
}
