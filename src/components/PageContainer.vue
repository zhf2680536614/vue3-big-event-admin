<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <!-- 卡片头部 -->
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 插槽定制按钮 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 卡片主体 -->
    <slot name="main"></slot>
  </el-card>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
