import { defineStore } from 'pinia'
import { ref } from 'vue'

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

    return { token, setToken, removeToken }
  },
  {
    persist: true
  }
)
