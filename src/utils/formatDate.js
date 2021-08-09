/**
  * @description format date
  * @param {String} date the value to be formatted
  * @param {Object} options date datepicker props
  * @param {String} options.value current value
  * @param {String} options.range is multi picker
  * @param {String} options.lang picker lang
  * @param {Object} options.dateFormat picker date format
  * @param {string} options.dateFormat.day // day format
  * @param {string} options.dateFormat.month // month format
  * @param {string} options.dateFormat.year // year format
  * @return {String} // formatted value
*/
export default function (date, options = {}) {
  const { selectedDate, range, lang, dateFormat } = options

  if (!date) return null
  if (range && selectedDate.filter(Boolean).length === 0) return null
  const result = new Date(date).toLocaleDateString(lang, {
    ...dateFormat
  })

  return result
}
