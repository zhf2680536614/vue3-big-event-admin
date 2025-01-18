<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './cpns/ChannelSelect.vue'
import { articleGetList } from '@/api/article'
import { dateFormat } from '@/utils/dateFormat'
// 假数据
const articleList = ref([])

const onEditArticle = (row) => {
  console.log(row)
}
const onDeleteArticle = (row) => {
  console.log(row)
}

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const total = ref(0)

const getList = async () => {
  const res = await articleGetList(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
}

getList()
</script>
<template>
  <page-container title="文章管理 ">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>
    <template #main>
      <el-form style="width: 100vw" inline>
        <el-form-item label="文章分类：">
          <!-- vue2的v-model -> :value和@input的组合 -->
          <!-- vue3的v-mddel -> :modelValue和@update:modelValue的组合 -->
          <!-- 第二种语法好处在于可以自定义绑定的变量名 -->
          <ChannelSelect v-model="params.cate_id"></ChannelSelect>
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select style="width: 10vw" v-model="params.state">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="articleList" style="width: 100%">
        <el-table-column label="文章标题" width="400">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">{{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template #default="{ row }">
            {{ dateFormat(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button
              :icon="Edit"
              circle
              plain
              type="primary"
              @click="onEditArticle(row)"
            ></el-button>
            <el-button
              :icon="Delete"
              circle
              plain
              type="danger"
              @click="onDeleteArticle(row)"
            ></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
    </template>
  </page-container>
</template>
<script setup></script>
