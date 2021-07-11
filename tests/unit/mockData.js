import formatDate from '@/utils/formatDate'
import Calendar from 'calendar-data-generate'

const Basic = {
  currentDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
    firstDayOfWeek: 'monday'
  },
  lang: 'en',
  textFormat: 'short',
  dateFormat: {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  },
  disableDate: { to: null, from: null },
  range: false,
  viewMode: 'days'
}

export const BasicData = {
  calendar: new Calendar(
    Basic.currentDate,
    Basic.lang,
    Basic.textFormat,
    { ...Basic.dateFormat },
    Basic.range
  ),
  formatDate: (value) => {
    return formatDate(value, BasicData)
  },
  ...Basic
}
