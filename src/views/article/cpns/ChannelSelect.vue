<script setup>
import { ref } from 'vue'
import { articleGetChannelsService } from '@/api/article'
const articleChannelList = ref([])

const getArticleChannelList = async () => {
  const res = await articleGetChannelsService()
  articleChannelList.value = res.data.data
}

getArticleChannelList()

defineProps({
  modelValue: {
    required: true,
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    :style="{ width }"
    placeholder="请选择"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in articleChannelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
