<script setup>
import { useUserStore } from '@/store'
const userStore = useUserStore()
</script>

<template>
  <div>大事件</div>
  <hr />
  <hr />
  <hr />
  <router-view></router-view>
  <hr />
  <hr />
  <hr />
  <el-button>按钮</el-button>

  <h1>{{ userStore.token }}</h1>
  <el-button @click="userStore.setToken('app testtest')">登录</el-button>
  <el-button @click="userStore.removeToken">退出</el-button>
</template>

<style scoped></style>
