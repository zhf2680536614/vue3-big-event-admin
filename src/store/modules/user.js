import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'user-store',
  () => {
    const token = ref('')

    //设置token
    const setToken = (newToken) => {
      token.value = newToken
    }

    //清除Token
    const removeToken = () => {
      token.value = ''
    }

    // 用户信息
    const userinfo = ref({})

    const getUserInfo = async () => {
      const res = await userGetInfoService()
      userinfo.value = res.data.data
    }

    const setUserInfo = (obj) => {
      userinfo.value = obj
    }

    const removeUserInfo = () => {
      userinfo.value = {}
    }
    return {
      token,
      setToken,
      removeToken,
      userinfo,
      getUserInfo,
      setUserInfo,
      removeUserInfo
    }
  },
  {
    persist: true
  }
)
