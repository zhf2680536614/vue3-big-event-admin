import request from '@/utils/request'

// 获取文章分离
export const articleGetChannelsService = () => request.get('/my/cate/list')
