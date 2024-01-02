import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

//格式化UTC时间
export function formatUtcString(utcString: string, format: string = TIME_FORMAT) {
  return dayjs.utc(utcString).format(format)
}
