<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './cpns/ChannelSelect.vue'
import { articleGetList } from '@/api/article'
import { dateFormat } from '@/utils/dateFormat'
import ArticleDraw from './cpns/ArticleDraw.vue'

const loading = ref(false)

const articleList = ref([])

const onAddArticle = () => {
  articleDrawRef.value.open({})
}

const onEditArticle = (row) => {
  articleDrawRef.value.open(row)
}
const onDeleteArticle = (row) => {
  console.log(row)
}

const params = ref({
  pagenum: 1,
  pagesize: 2,
  cate_id: '',
  state: ''
})

const total = ref(0)

const getList = async () => {
  loading.value = true
  const res = await articleGetList(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

getList()

const onHandleSizeChange = (value) => {
  //页面显示的记录数发生变化时，当前页需要变化为第一页
  params.value.pagenum = 1
  params.value.pagesize = value
  getList()
}

const onHandleCurrentChange = (value) => {
  params.value.pagenum = value
  getList()
}

const onSearch = () => {
  params.value.pagenum = 1
  getList()
}

const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getList()
}

const articleDrawRef = ref()

// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getList()
}
</script>
<template>
  <page-container title="文章管理 ">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <template #main>
      <!-- 检索重置及添加 -->
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
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 展示的表单 -->
      <el-table :data="articleList" style="width: 100%" v-loading="loading">
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
      <!-- 分页组件 -->
      <el-pagination
        class="pagination"
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 4, 6, 8]"
        :background="true"
        layout="jumper, total, sizes, prev, pager, next"
        :total="total"
        @size-change="onHandleSizeChange"
        @current-change="onHandleCurrentChange"
      />
      <!-- 抽屉组件 -->
      <ArticleDraw ref="articleDrawRef" @success="onSuccess"></ArticleDraw>
    </template>
  </page-container>
</template>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  margin-left: 500px;
}
</style>
