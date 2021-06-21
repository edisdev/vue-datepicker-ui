import formatDate from '@/utils/formatDate'
import Calendar from 'calendar-data-generate'

const Basic = {
  currentDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
    firstDayOfWeek: 'monday'
  },
  lang: 'tr',
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

const BASIC_CALENDAR = new Calendar(
  Basic.currentDate,
  Basic.lang,
  Basic.textFormat,
  { ...Basic.dateFormat },
  Basic.range
)

export const BasicData = {
  calendar: BASIC_CALENDAR,
  formatDate: (value) => {
    return formatDate(value, BasicData)
  },
  ...Basic
}
