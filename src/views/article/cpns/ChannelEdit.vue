<script setup>
import { ref } from 'vue'
import {
  articleAddChannelsService,
  articleEditChannelsService
} from '@/api/article'

const dialogVisible = ref(false)

const cateRef = ref()

const open = (obj) => {
  cateForm.value = { ...obj }
  dialogVisible.value = true
}

// 将open方法暴露出去给父组件使用
defineExpose({
  open
})

//定义数据
const cateForm = ref({
  cate_name: '',
  cate_alias: ''
})

//定义校验规则
const rules = ref({
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须为 1-10 位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须为 1-15 位的数字或字母',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value.length !== 0 && value === cateForm.value.cate_name)
          callback(new Error('名称与别名不能相同'))
        callback()
      },
      trigger: 'blur'
    }
  ]
})

// 确认提交
const emit = defineEmits(['success'])

const confirm = async () => {
  await cateRef.value.validate()
  cateForm.value.id
    ? await articleEditChannelsService(cateForm.value)
    : await articleAddChannelsService(cateForm.value)

  ElMessage.success(cateForm.value.id ? '修改成功' : '添加成功')
  //关闭弹层
  dialogVisible.value = false
  //父传子重新获取数据
  emit('success')
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="cateForm.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form :model="cateForm" :rules="rules" ref="cateRef">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model.trim="cateForm.cate_name"
          placeholder="请输入分类名称"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model.trim="cateForm.cate_alias"
          placeholder="请输入分类别名"
          maxlength="15"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
