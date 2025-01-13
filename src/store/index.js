import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 将user中的所有内容导入，再将user中的所有内容导出
export * from './modules/user'
