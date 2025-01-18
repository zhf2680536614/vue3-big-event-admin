import { dayjs } from 'element-plus'

export const dateFormat = (time) => dayjs(time).format('YYYY年MM月DD日')
