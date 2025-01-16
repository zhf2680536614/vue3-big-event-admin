<script setup>
import { ref, onMounted } from 'vue'
import { articleGetChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'

const loading = ref(false)
const articleChannelList = ref([])

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

const onEditChannel = (row, $index) => {
  console.log(row, $index)
}

const onDelChannel = (row, $index) => {
  console.log(row, $index)
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
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
</template>
