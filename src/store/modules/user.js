import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService, userUpdateInfoService } from '@/api/user'

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
    const user = ref({
      username: '',
      nickname: '',
      email: '',
      id: '',
      user_pic: ''
    })

    const getuser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }

    const setuser = (obj) => {
      user.value = obj
    }

    const removeuser = () => {
      user.value = {}
    }

    const userUpdate = async (value) => {
      await userUpdateInfoService(value)
      user.value = value
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getuser,
      setuser,
      removeuser,
      userUpdate
    }
  },
  {
    persist: true
  }
)
