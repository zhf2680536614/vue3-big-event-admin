<script setup>
import { ref, onMounted } from 'vue'
import {
  articleGetChannelsService,
  articleDelChannelsService
} from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './cpns/ChannelEdit.vue'

const loading = ref(false)
const articleChannelList = ref([])
const dialog = ref()

const getArticleChannelList = async () => {
  loading.value = true
  const res = await articleGetChannelsService()
  articleChannelList.value = res.data.data
  loading.value = false
}

// 页面渲染出来之后发送请求
onMounted(() => {
  getArticleChannelList()
})

const onAddChannel = () => {
  dialog.value.open({})
}

const onEditChannel = (row, $index) => {
  dialog.value.open(row)
  console.log($index)
}

const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认要删除吗', '温馨提示', {
    type: 'warning',
    ConfirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await articleDelChannelsService(row.id)
  getArticleChannelList()
  ElMessage.success('删除成功')
}

const onSuccess = () => {
  getArticleChannelList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <template #main>
      <el-table
        :data="articleChannelList"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          type="index"
          label="序号"
          width="150"
        ></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row, $index }">
            <el-button
              :icon="Edit"
              circle
              plain
              type="primary"
              @click="onEditChannel(row, $index)"
            >
            </el-button>
            <el-button
              :icon="Delete"
              circle
              plain
              type="danger"
              @click="onDelChannel(row, $index)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </page-container>

  <channel-edit @success="onSuccess" ref="dialog"></channel-edit>
</template>
