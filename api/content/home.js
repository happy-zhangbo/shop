import request from '@/util/axios';

export const getList = (current, size, params) => {
  return request({
    url: 'web/home/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}