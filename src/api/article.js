import request from '@/utils/request'

// 获取文章分离
export const articleGetChannelsService = () => request.get('/my/cate/list')

// 添加文章分类
export const articleAddChannelsService = (data) =>
  request.post('/my/cate/add', data)

// 修改文章分类
export const articleEditChannelsService = (data) =>
  request.put('/my/cate/info', data)

// 删除文章分类
export const articleDelChannelsService = (id) =>
  request.delete('/my/cate/del', {
    params: {
      id
    }
  })
