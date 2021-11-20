<template>
  <section class="v-calendar" :class="[position, { long: range }]">
    <div class="input-field" :class="{ long: range }">
      <input
        type="text"
        :class="[inputClass]"
        :placeholder="placeholder"
        @click="isShowPicker = !isShowPicker"
        :disabled="disabled"
        :value="formattedValue"
        readonly
      />
      <svg
        class="datepicker"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"
        ></path>
      </svg>
      <button
        v-if="showClearButton && selectedDate"
        type="button"
        class="clearButton"
        @click="resetDate">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="content" v-if="isShowPicker">
      <CalendarUI
        :calendar="calendar"
        :current-date="currentDate"
        :format-date="formatDate"
        :selected-date="selectedDate"
        :range="range"
        :circle="circle"
        :range-seperator="rangeSeperator"
        :text-format="textFormat"
        :view-mode="calendarView"
        :disable-date="range ? disabledStartDateCalc : disabledStartDate"
        @prevMonth="prevMonth"
        @nextMonth="nextMonth"
        @handlerDate="handlerDate"
        @changeViewMode="changeViewMode"
        @setYears="setYears"
        @setYear="setYear"
        @setMonth="setMonth"
        @setUniqYear="setUniqYear"
      />

      <CalendarUI
        v-if="range"
        :calendar="calendarEnd"
        :current-date="currentDateEnd"
        :format-date="formatDate"
        :selected-date="selectedDate"
        :range="range"
        :circle="circle"
        :range-seperator="rangeSeperator"
        :text-format="textFormat"
        :view-mode="calendarEndView"
        :disable-date="disabledEndDateCalc"
        picker-type="end"
        @prevMonth="prevMonth"
        @nextMonth="nextMonth"
        @handlerDate="handlerDate"
        @changeViewMode="changeViewMode"
        @setYears="setYears"
        @setYear="setYear"
        @setMonth="setMonth"
        @setUniqYear="setUniqYear"
      />
    </div>
  </section>
</template>

<script>
import Calendar from 'calendar-data-generate'
//
import { MODE_ENUMS } from '@/utils/modes'
import formatDate from '@/utils/formatDate'
//
import CalendarUI from './calendar'

export default {
  name: 'VueDatePicker',
  components: { CalendarUI },
  emits: ['update:modelValue', 'selectDate', 'reset'],
  props: {
    modelValue: {},
    textFormat: {
      type: String,
      default: 'short'
    },
    dateFormat: {
      type: Object,
      default: () => {
        return { day: '2-digit', month: 'short', year: 'numeric' }
      }
    },
    format: {
      type: String,
      default: ''
    },
    rangeSeperator: {
      type: String,
      default: '~'
    },
    position: {
      type: String,
      default: 'left'
    },
    range: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: 'tr'
    },
    inputClass: {
      type: String,
      default: ''
    },
    firstDayOfWeek: {
      type: String,
      validator: (val) => ['monday', 'sunday'].indexOf(val) > -1,
      default: 'monday'
    },
    disabledStartDate: {
      type: Object,
      default () {
        return {
          from: null,
          to: null
        }
      }
    },
    disabledEndDate: {
      type: Object,
      default () {
        return {
          from: null,
          to: null
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Select Date'
    },
    circle: {
      type: Boolean,
      default: false
    },
    showClearButton: {
      type: Boolean,
      default: false
    },
    showPickerInital: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowPicker: false,
      currentDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        firstDayOfWeek: this.firstDayOfWeek
      },
      currentDateEnd: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        firstDayOfWeek: this.firstDayOfWeek
      },
      selectedDate: this.defaultSelectedDate(),
      calendarView: MODE_ENUMS.DAY,
      calendarEndView: MODE_ENUMS.DAY
    }
  },
  computed: {
    disabledStartDateCalc () {
      const unSelectedDate = {
        from: null,
        to: null
      }
      if (this.range) {
        const endDate = this.selectedDate[1]
        let disabledDate = endDate ? new Date(endDate) : null
        disabledDate =
          !this.disabledStartDate.from ||
          disabledDate.getTime() < this.disabledStartDate.from.getTime()
            ? disabledDate
            : this.disabledStartDate.from
        unSelectedDate.from = disabledDate
        unSelectedDate.to = this.disabledStartDate.from
      }
      return unSelectedDate
    },
    disabledEndDateCalc () {
      const unSelectedDate = {
        from: null,
        to: null
      }
      if (this.range) {
        let disabledDate = new Date(this.selectedDate[0])
        disabledDate =
          !this.disabledEndDate.to ||
          disabledDate.getTime() > this.disabledEndDate.to.getTime()
            ? disabledDate
            : this.disabledEndDate.to
        unSelectedDate.to = disabledDate
        unSelectedDate.from = this.disabledEndDate.from
      }
      return unSelectedDate
    },
    calendar () {
      return new Calendar(
        this.currentDate,
        this.lang,
        this.textFormat,
        { ...this.dateFormat },
        this.range ? this.disabledStartDateCalc : this.disabledStartDate
      )
    },
    calendarEnd () {
      if (!this.range) return {}
      return new Calendar(
        this.currentDateEnd,
        this.lang,
        this.textFormat,
        { ...this.dateFormat },
        this.disabledEndDateCalc
      )
    },
    formattedValue () {
      if (!this.range) {
        return this.formatDate(this.selectedDate)
      } else if (!Array.isArray(this.selectedDate) || this.selectedDate.filter(Boolean).length !== 2) return null
      return `${this.formatDate(this.selectedDate[0])} ${
        this.rangeSeperator
      } ${this.formatDate(this.selectedDate[1])}`
    }
  },
  methods: {
    formatDate (value) {
      return formatDate(value, this)
    },
    prevMonth (picker) {
      const currentDate =
        picker === 'start' ? this.currentDate : this.currentDateEnd
      currentDate.month = currentDate.month - 1
      if (currentDate.month === -1) {
        currentDate.year = currentDate.year - 1
        currentDate.month = 11
      }
    },
    nextMonth (picker) {
      const currentDate =
        picker === 'start' ? this.currentDate : this.currentDateEnd
      currentDate.month = currentDate.month + 1
      if (currentDate.month === 12) {
        currentDate.year = currentDate.year + 1
        currentDate.month = 0
      }
    },
    changeViewMode ({ mode, picker }) {
      const isEndPicker = picker === 'end'
      const calendar = `calendar${isEndPicker ? 'End' : ''}View`
      this[calendar] = mode
    },
    setYears ({ route, picker }) {
      if (picker === 'start') {
        const year =
          route === 'prev'
            ? this.calendar.years[0] - 11
            : route === 'next'
              ? this.calendar.years[10] + 1
              : ''
        this.currentDate.year = year
      } else if (picker === 'end') {
        const year =
          route === 'prev'
            ? this.calendarEnd.years[0] - 11
            : route === 'next'
              ? this.calendarEnd.years[10] + 1
              : ''
        this.currentDateEnd.year = year
      }
    },
    setYear ({ year, picker }) {
      this.setUniqYear({ year, picker })
      this.changeViewMode({ mode: MODE_ENUMS.MONTH, picker })
    },
    setUniqYear ({ year, picker }) {
      if (picker === 'start') this.currentDate.year = year
      else if (picker === 'end') this.currentDateEnd.year = year
    },
    setMonth ({ month, picker }) {
      if (picker === 'start') this.currentDate.month = month
      else if (picker === 'end') this.currentDateEnd.month = month
      this.changeViewMode({ mode: MODE_ENUMS.DAY, picker })
    },
    handlerDate ({ fullDate, picker = null }) {
      if (!this.range) {
        this.setDate(fullDate)
        return
      }
      const selectedDates = [
        picker === 'start' ? fullDate : this.selectedDate[0],
        picker === 'end' ? fullDate : this.selectedDate[1]
      ]
      this.setDate(selectedDates)
    },
    setDate (selectedDates) {
      if (typeof selectedDates === 'undefined') {
        this.resetDate()
        return
      }
      this.selectedDate = selectedDates
      this.emitInputAction()
    },
    emitInputAction () {
      if (JSON.stringify(this.modelValue) !== this.selectedDate) {
        this.$emit('update:modelValue', this.selectedDate)
      }
      this.$nextTick(() => {
      })
      if (this.range) {
        if (this.selectedDate.filter(Boolean).length === 2) this.close()
      } else {
        this.close()
      }
    },
    close () {
      this.isShowPicker = false
      this.calendarView = MODE_ENUMS.DAY
      this.calendarEndView = MODE_ENUMS.DAY
    },
    resetDate () {
      this.selectedDate = this.defaultSelectedDate()
      this.$emit('reset')
    },
    defaultSelectedDate () {
      return this.range ? [null, null] : null
    },
    setCurrents () {
      if (typeof this.modelValue === 'undefined') {
        this.resetDate()
        return
      }
      if (this.range) {
        if (this.modelValue[0]) {
          this.currentDate.year = new Date(this.modelValue[0]).getFullYear()
          this.currentDate.month = new Date(this.modelValue[0]).getMonth()
          this.currentDate.date = new Date(this.modelValue[0]).getDate()
        }
        if (this.modelValue[1]) {
          this.currentDateEnd.year = new Date(this.modelValue[1]).getFullYear()
          this.currentDateEnd.month = new Date(this.modelValue[1]).getMonth()
          this.currentDateEnd.date = new Date(this.modelValue[1]).getDate()
        }
      } else if (this.modelValue) {
        this.currentDate.year = new Date(this.modelValue).getFullYear()
        this.currentDate.month = new Date(this.modelValue).getMonth()
        this.currentDate.date = new Date(this.modelValue).getDate()
      }
    }
  },
  mounted () {
    this.setDate(this.modelValue)
    this.setCurrents()
    this.isShowPicker = this.showPickerInital
    this.$watch('modelValue', () => {
      this.setCurrents()
      this.setDate(this.modelValue)
    })
    this.$watch('selectedDate', (value) => {
      if (!value && this.modelValue === value) return
      this.$emit('selectDate', value)
    })
    document.body.addEventListener('click', (e) => {
      const Datepicker = this.$el
      const isThis = Datepicker.contains(e.target)
      if (!isThis) this.close()
    })
  }
}
</script>

<style>
:root {
  --v-calendar-picker-color: #fff;
  --v-calendar-input-bg-color: #fff;
  --v-calendar-input-bg-disable-color: rgb(245, 245, 245);
  --v-calendar-input-text-disable-color: #b8b8b9;
  --v-calendar-select-bg-color: #fff;
  --v-calendar-border-color: #eaeaeb;
  --v-calendar-triangle-color: #eaeaeb;
  --v-calendar-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.2);
  --v-calendar-top-shadow: 3px -14px 30px 0px rgba(0, 0, 0, 0.2);
  --v-calendar-text-color: #7b8187;
  --v-calendar-action-color: #7b8187;
  --v-calendar-text-disabled-color: #b8b8b9;
  --v-calendar-view-button-color: #7b8187;
  --v-calendar-view-button-font-weight: 400;
  --v-calendar-view-button-font-size: 1rem;
  --v-calendar-datepicker-icon-color: #1bba67;
  --v-calendar-datepicker-icon-size: 1.1rem;
  --v-calendar-active-bg-color: #1bba67;
  --v-calendar-active-text-color: #fff;
  --v-calendar-range-bg-color: #edfff9;
  --v-calendar-range-text-color: #7b8187;
  --v-calendar-range-radius: 100%;
  --v-calendar-day-hover-bg-color: #eaeaeb;
  --v-calendar-day-width: 25px;
  --v-calendar-day-height: 25px;
  --v-calendar-day-font-size: 0.9rem;
  --v-calendar-day-font-weight: 400;
  --v-calendar-day-name-font-size: 0.9rem;
  --v-calendar-day-name-font-weight: 500;
  --v-calendar-day-name-color: #7b8187;
  --v-calendar-input-border: 1px solid #eaeaeb;
  --v-calendar-input-text-color: #7b8187;
  --v-calendar-input-font-size: 0.9rem;
  --v-calendar-input-font-weight: 400;
  --v-calendar-content-radius: 0px;
  --v-calendar-year-font-size: 1.1rem;
  --v-calendar-year-color: #7b8187;
  --v-calendar-year-font-weight: 400;
  --v-calendar-year-disabled-color: #b8b8b9;
  --v-calendar-year-disabled-bg-color: transparent;
  --v-calendar-year-padding: 10px;
  --v-calendar-year-border: none;
  --v-calendar-year-border-radius: none;
  --v-calendar-month-font-size: 1.1rem;
  --v-calendar-month-color: #7b8187;
  --v-calendar-month-font-weight: 400;
  --v-calendar-month-disabled-color: #b8b8b9;
  --v-calendar-month-disabled-bg-color: transparent;
  --v-calendar-month-padding: 8px;
  --v-calendar-month-border: none;
  --v-calendar-month-border-radius: none;
}

.v-calendar *:focus {
  outline: none;
}

.v-calendar * {
  outline: none;
  font-family: inherit;
}

.v-calendar {
  position: relative;
  width: 100%;
  width: max-content;
  min-width: max-content;
}

.v-calendar .content {
  display: flex;
  background: var(--v-calendar-picker-color);
  box-shadow: var(--v-calendar-shadow);
  position: absolute;
  top: 56px;
  z-index: 99999;
}

.v-calendar .input-field {
  display: flex;
  position: relative;
  min-width: 140px;
  font-weight: var(--v-calendar-input-font-weight);
}

.v-calendar .input-field .clearButton {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  color: var(--v-calendar-text-color);
  padding: 0;
  cursor: pointer;
  border: none;
  background: transparent;
}

.v-calendar .input-field .clearButton svg {
  fill: currentColor;
}

.v-calendar .input-field .clearButton,
.v-calendar .input-field .clearButton svg {
  width: var(--v-calendar-day-font-size);
  height: var(--v-calendar-day-font-size);
}

.v-calendar .input-field input:disabled ~ svg {
  fill: var(--v-calendar-text-color);
}

.v-calendar .input-field.long {
  min-width: 290px;
}

.v-calendar .input-field input {
  padding-left: 40px;
  padding-right: 20px;
  font-size: var(--v-calendar-input-font-size);
  min-width: inherit;
  height: 50px;
  border-radius: 6px;
  border: var(--v-calendar-input-border);
  background-color: var(--v-calendar-input-bg-color);
  color: var(--v-calendar-input-text-color);
  font-weight: inherit;
}

.v-calendar .input-field input:disabled {
  background-color: var(--v-calendar-input-bg-disable-color);
  color: var(--v-calendar-input-text-disable-color);
  cursor: not-allowed;
}

.v-calendar .input-field svg {
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
}

.v-calendar .input-field svg.datepicker {
  left: 10px;
  width: var(--v-calendar-datepicker-icon-size);
  height: var(--v-calendar-datepicker-icon-size);
  fill: var(--v-calendar-datepicker-icon-color);
}

.v-calendar .calendar {
  width: max-content;
}

.v-calendar .calendar.range:first-child {
  border-right: 1px solid var(--v-calendar-border-color);
}

.v-calendar .calendar:first-child::before {
  content: "";
  position: absolute;
  bottom: 100%;
  top: -20px;
}

.v-calendar .calendar .selected-field {
  padding-top: 20px;
  background-color: var(--v-calendar-select-bg-color);
}

.v-calendar .calendar .selected-field .selected-date {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.v-calendar .calendar .selected-field .viewButton {
  border: 0;
  width: 100%;
  padding: 10px;
  color: var(--v-calendar-view-button-color);
  font-size: var(--v-calendar-view-button-font-size);
  font-weight: var(--v-calendar-view-button-font-weight);
  margin-right: 10px;
  margin-left: 10px;
  background: transparent;
  cursor: pointer;
}

.v-calendar .calendar .selected-field .prevDateButton,
.v-calendar .calendar .selected-field .nextDateButton {
  position: relative;
  border: 0;
  background: transparent;
}

.v-calendar .calendar .selected-field .prevDateButton::after,
.v-calendar .calendar .selected-field .nextDateButton::after {
  content: "";
  display: inline-block;
  text-align: left;
  cursor: pointer;
  border: 7px solid transparent;
}

.v-calendar .calendar .selected-field .prevDateButton::after {
  border-right: 10px solid var(--v-calendar-action-color);
}

.v-calendar .calendar .selected-field .nextDateButton::after {
  border-left: 10px solid var(--v-calendar-action-color);
}

.v-calendar .calendar .days {
  display: grid;
  grid-template-columns: repeat(7, minmax(max-content, 1fr));
}

.v-calendar .calendar .years,
.v-calendar .calendar .months {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  max-width: calc((var(--v-calendar-day-width) * 7) + 20px);
}

.v-calendar .calendar .years,
.v-calendar .calendar .months {
  min-height: 250px;
}

.v-calendar .calendar .selected-field,
.v-calendar .calendar .days-selection {
  padding-left: 20px;
  padding-right: 20px;
}

.v-calendar .calendar .days-selection .days {
  padding-bottom: 20px;
}

.v-calendar .calendar .days .day,
.v-calendar .calendar .years .year,
.v-calendar .calendar .months .month {
  background: transparent;
  border: 0;
  text-align: center;
  cursor: pointer;
}

.v-calendar .calendar .years .year,
.v-calendar .calendar .months .month {
  width: max-content;
  height: max-content;
}

.v-calendar .calendar .months .month {
  font-size: var(--v-calendar-month-font-size);
  font-weight: var(--v-calendar-month-font-weight);
  color: var(--v-calendar-month-color);
  padding: var(--v-calendar-month-padding);
  border: var(--v-calendar-month-border);
  border-radius: var(--v-calendar-year-month-radius);
  background-color: var(--v-calendar-month-bg-color);
}

.v-calendar .calendar .months .month:disabled {
  pointer-events: none;
  color: var(--v-calendar-month-disabled-color);
  background-color: var(--v-calendar-month-disabled-bg-color);
}

.v-calendar .calendar .days .day {
  padding: 0;
  margin-right: 10px;
  font-size: var(--v-calendar-day-font-size);
  font-weight: var(--v-calendar-day-font-weight);
  color: var(--v-calendar-text-color);
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: left;
}

.v-calendar .calendar .days .day .number {
  display: flex;
  width: var(--v-calendar-day-width);
  height: var(--v-calendar-day-height);
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: inherit;
}

.v-calendar .calendar .days .day.name {
  pointer-events: none;
  font-size: var(--v-calendar-day-name-font-size);
  font-weight: var(--v-calendar-day-name-font-weight);
  color: var(--v-calendar-day-name-color);
  width: auto;
}

.v-calendar .calendar .days .day.selectedDate .number {
  background: var(--v-calendar-active-bg-color);
  color: var(--v-calendar-active-text-color);
}

.v-calendar .calendar .days .day.circle .number {
  border-radius: 100%;
}

.v-calendar .calendar .days .day.selectedRange {
  background: var(--v-calendar-range-bg-color);
  color: var(--v-calendar-range-text-color);
}

.v-calendar .calendar:first-child .days .day.selectedDate {
  border-top-left-radius: var(--v-calendar-range-radius);
  border-bottom-left-radius: var(--v-calendar-range-radius);
}

.v-calendar .calendar:last-child .days .day.selectedDate {
  border-top-right-radius: var(--v-calendar-range-radius);
  border-bottom-right-radius: var(--v-calendar-range-radius);
}

.v-calendar .calendar .days .day.disabledDate {
  pointer-events: none;
  color: var(--v-calendar-text-disabled-color);
}

.v-calendar .calendar .days .day.disabledDate.selectedRange {
  background: var(--v-calendar-range-bg-color);
}

.v-calendar .calendar .days .day:hover .number{
  background: var(--v-calendar-day-hover-bg-color);
}

.v-calendar .calendar .years .year {
  font-size: var(--v-calendar-year-font-size);
  font-weight: var(--v-calendar-year-font-weight);
  color: var(--v-calendar-year-color);
  padding: var(--v-calendar-year-padding);
  border: var(--v-calendar-year-border);
  border-radius: var(--v-calendar-year-border-radius);
  background-color: var(--v-calendar-year-bg-color);
}

.v-calendar .calendar .years .year:disabled {
  pointer-events: none;
  color: var(--v-calendar-year-disabled-color);
  background-color: var(--v-calendar-year-disabled-bg-color);
}

.v-calendar.left .content {
  left: 0;
  transform: translateY(5px);
  border-bottom-left-radius: var(--v-calendar-content-radius);
  border-bottom-right-radius: var(--v-calendar-content-radius);
  border-top-right-radius: var(--v-calendar-content-radius);
}

.v-calendar.left .calendar:first-child::before {
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent var(--v-calendar-triangle-color)
    transparent;
  left: 0;
}

.v-calendar.right .content {
  right: 0;
  transform: translateY(5px);
  border-bottom-left-radius: var(--v-calendar-content-radius);
  border-bottom-right-radius: var(--v-calendar-content-radius);
  border-top-left-radius: var(--v-calendar-content-radius);
}

.v-calendar.right .calendar:first-child::before {
  right: 0;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent var(--v-calendar-triangle-color)
    transparent;
}

.v-calendar.top .content {
  top: 100%;
  transform: translateY(calc(-100% - 66px));
  box-shadow: var(--v-calendar-top-shadow);
  border-top-left-radius: var(--v-calendar-content-radius);
  border-top-right-radius: var(--v-calendar-content-radius);
  border-bottom-right-radius: var(--v-calendar-content-radius);
}

.v-calendar.top .content .calendar:first-child::before {
  border-width: 5px;
  border-style: solid;
  border-color: var(--v-calendar-triangle-color) transparent transparent
    transparent;
  top: 100%;
  left: 0;
}

.v-calendar.bottom .content {
  transform: translateY(5px);
  border-bottom-left-radius: var(--v-calendar-content-radius);
  border-bottom-right-radius: var(--v-calendar-content-radius);
  border-top-right-radius: var(--v-calendar-content-radius);
}

.v-calendar.bottom .content .calendar:first-child::before {
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent var(--v-calendar-triangle-color)
    transparent;
  left: 0;
}

.v-calendar.center .calendar:first-child::before {
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent var(--v-calendar-triangle-color)
    transparent;
  left: 50%;
  transform: translateX(-50%);
}

.v-calendar.center .content {
  transform: translateY(5px) translateX(-50%);
  left: 50%;
  border-bottom-left-radius: var(--v-calendar-content-radius);
  border-bottom-right-radius: var(--v-calendar-content-radius);
  border-top-right-radius: var(--v-calendar-content-radius);
}
</style>
