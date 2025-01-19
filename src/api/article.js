import request from '@/utils/request'

// 获取文章分类
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

// 文章管理

// 获取文章列表
export const articleGetList = (params) =>
  request.get('/my/article/list', {
    params
  })

export const artPublishService = (data) => request.post('/my/article/add', data)
