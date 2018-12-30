<template>
  <section class="v-calendar" :class="[position, {'long': range}]">
    <div class="input-field" :class="{'long': range}">
      <svg class="datepicker" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <title>calendar</title>
        <path
          d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"
        ></path>
      </svg>
      <input
      type="text" 
      :class="[inputClass]" 
      @click="isShowPicker= !isShowPicker"
      :value="formattedValue" readonly/>
    </div>
    <div class="content"
     v-if="isShowPicker">
      <div class="calendar" :class="{'textLong': textFormat === 'long'}">
        <div class="selected-field">
          <div class="selected-date">
            <button class="prevDateButton" type="button" @click="prevMount('start')"></button>
            <button type="button" class="viewButton">{{ this.calendar.months[currentDate.month].name }} {{ this.currentDate.year }}</button>
            <button class="nextDateButton" type="button" @click="nextMount('start')"></button>
          </div>
        </div>
        <div class="days">
          <div class="day name"
          v-for="day in calendar.days"
          :key="`${day.dayNumber}-day`">
            {{ day.name }}
          </div>
          <button
          class="day square"
          :class="[{'disabledDate': !mDay.isDayInMouth || !mDay.isUsable}, {'selectedDate': range ? formatDate(selectedDate[0]) === mDay.date : formatDate(selectedDate) === mDay.date }, {'selectedRange': isInSelectedDate(mDay.fullDate)}]"
          v-for="(mDay,index) in calendar.daysOfMonth"
          :key="`${index}-mounthday`"
          @click="handlerDate(mDay.fullDate,'start')"
          type="button">
            <span class="number">{{ mDay.day }}</span>
          </button>
        </div>
      </div>
      <div class="calendar" :class="{'textLong': textFormat === 'long'}" v-if="range">
        <div class="selected-field">
          <div class="selected-date">
            <button class="prevDateButton" type="button" @click="prevMount('end')"></button>
            <div>{{ this.calendarEnd.months[currentDateEnd.month].name }} {{ this.currentDateEnd.year }} </div>
            <button class="nextDateButton" type="button" @click="nextMount('end')"></button>
          </div>
        </div>
        <div class="days">
          <div class="day name"
          v-for="day in calendarEnd.days"
          :key="`${day.dayNumber}-day`">
            {{ day.name }}
          </div>
          <button
          class="day square"
          :class="[{'disabledDate': !mDay.isDayInMouth || !mDay.isUsable}, {'selectedDate': formatDate(selectedDate[1]) === mDay.date}, {'selectedRange': isInSelectedDate(mDay.fullDate)}]"
          v-for="(mDay,index) in calendarEnd.daysOfMonth"
          :key="`${index}-mounthday`" @click="handlerDate(mDay.fullDate, 'end')"
          type="button">
            <span class="number">{{ mDay.day }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Calendar from './datepicker'

export default {
  name: 'VueDatePicker',
  data() {
    return {
      calendarWiew: 'day',
      isShowPicker: false,
      currentDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        firstDayOfWeek: this.firstDayOfWeek,
      },
      currentDateEnd: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        firstDayOfWeek: this.firstDayOfWeek
      },
      selectedDate: this.range ? [null, null] : null
    }
  },
  props: {
    textFormat: {
      type: String,
      default: 'short'
    },
    dateFormat: {
      type: Object,
      default: function() {
        return { day: '2-digit', month: 'long', year: 'numeric' }
      },
    },
    position: {
      type: String,
      default: 'left'
    },
    value: {
      type: [Array, String, Date]
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
      default: 'monday' // monday or sunday
    },
    disabledStartDate: {
      type: Object,
      default() {
        return {
          from: null,
          to: null
        }
      }
    },
    disabledEndDate: {
      type: Object,
      default() {
        return {
          from: null,
          to: null
        }
      }
    }
  },
  computed: {
    disabledStartDateCalc() {
      let unSelectedDate = {
        from: null,
        to: null
      }
      if (this.range) {
        let disabledDate = new Date(this.selectedDate[1])
        disabledDate = (!this.disabledStartDate.from || disabledDate.getTime() < this.disabledStartDate.from.getTime()) ? disabledDate : this.disabledStartDate.from
        unSelectedDate.from = disabledDate
        unSelectedDate.to = this.disabledStartDate.from
      }
      return unSelectedDate
    },
    disabledEndDateCalc() {
      let unSelectedDate = {
        from: null,
        to: null
      }
      if (this.range) {
        let disabledDate = new Date(this.selectedDate[0])
        disabledDate = (!this.disabledEndDate.to || disabledDate.getTime() > this.disabledStartDate.to.getTime()) ? disabledDate : this.disabledStartDate.from
        unSelectedDate.to = disabledDate
        unSelectedDate.from = this.disabledEndDate.from
      }
      return unSelectedDate
    },
    calendar() {
      return new Calendar(
        this.currentDate,
        this.lang,
        this.textFormat,
        { ...this.dateFormat },
        this.range ? this.disabledStartDateCalc : this.disabledStartDate
      )
    },
    calendarEnd() {
      if (!this.range) return false
      return new Calendar(
        this.currentDateEnd,
        this.lang,
        this.textFormat,
        { ...this.dateFormat },
       this.range ? this.disabledEndDateCalc : this.disabledEndDate
      )
    },
    formattedValue() {
      if (!this.range) {
        return this.formatDate(this.selectedDate)
      }
      return `${this.formatDate(this.selectedDate[0])} ~ ${this.formatDate(this.selectedDate[1])}`
    }
  },
  methods: {
    formatDate(value) {
      return new Date(value).toLocaleDateString(this.lang, { ...this.dateFormat })
    },
    prevMount(type) {
      const currentDate = type === 'start' ? this.currentDate : this.currentDateEnd
      currentDate.month = currentDate.month - 1
      if (currentDate.month === -1) {
        currentDate.year = currentDate.year - 1
        currentDate.month = 11
      }
    },
    nextMount(type) {
      const currentDate = type === 'start' ? this.currentDate : this.currentDateEnd
      currentDate.month = currentDate.month + 1
      if (currentDate.month === 12) {
        currentDate.year = currentDate.year + 1
        currentDate.month = 0
      }
    },
    handlerDate(fullDate, type = null) {
      if (!this.range) {
        this.setDate(fullDate)
        return
      }
      const selectedDates = [
        type === 'start' ? fullDate : this.selectedDate[0],
        type === 'end' ? fullDate : this.selectedDate[1]
      ]
      this.setDate(selectedDates)
    },
    setDate(selectedDates) {
      this.$emit('input', selectedDates)
      this.selectedDate = selectedDates
    },
    isInSelectedDate(date) {
      return new Date(this.selectedDate[0]).getTime() <= date.getTime() && new Date(this.selectedDate[1]).getTime() >= date.getTime()
    },
    changeView(view) {
      this.calendarWiew = view
    }
  },
  mounted() {
    this.setDate(this.value)
    window.addEventListener('click', (e) => {
      const el = e.target.closest('.v-calendar')
      if (!el) this.isShowPicker = false
    })
  }
}
</script>

<style>

.v-calendar *:focus {
  outline: none;
}

.v-calendar {
  position: relative;
  width: 100%;
  width: max-content;
  min-width: max-content;
}


.v-calendar .content {
  display: flex;
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, .2);
  border: 1px solid #eaeaeb;
  position: absolute;
  background: #fff;
  top: 56px;
  z-index: 99999;
}
.v-calendar .input-field {
  display: flex;
  position: relative;
  min-width: 140px;
}
.v-calendar .input-field.long {
  min-width: 290px;
}
.v-calendar .input-field input {
  padding-left: 40px;
  padding-right: 20px;
  font-size: 12px;
  min-width: inherit;
  height: 50px;
  border-radius: 6px;
  border: 1px solid #eaeaeb;
}
.v-calendar .input-field svg {
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
}
.v-calendar .input-field svg.datepicker {
  width: 19px;
  height: 19px;
  left: 10px;
  fill: #1bba67;
}
.v-calendar .calendar {
  padding: 20px;
  width: 300px;
}
.v-calendar .calendar.textLong {
  width: 580px;
}
.v-calendar .calendar:first-child {
  border-right: 1px solid #eaeaeb;
}
.v-calendar .calendar:first-child::before {
  content: "";
  position: absolute;
  bottom: 100%;
  top: -20px;
}
.v-calendar .calendar .selected-field {
  padding: 10px;
  margin-bottom: 10px;
}
.v-calendar .calendar .selected-field .selected-date {
  display: flex;
  justify-content: space-between;
}
.v-calendar .calendar .selected-field .viewButton {
  border: 0;
  width: 100%;
  padding: 10px;
  color: #333;
  font-size: 1em;
  margin-right: 10px;
  margin-left: 10px;
  background: transparent;
}

.v-calendar .calendar .selected-field .prevDateButton, .v-calendar .calendar .selected-field .nextDateButton {
  position: relative;
  border: 0;
  background: transparent;
}
.v-calendar .calendar .selected-field .prevDateButton::after, .v-calendar .calendar .selected-field .nextDateButton::after {
  content: "";
  display: inline-block;
  text-align: left;
  cursor: pointer;
  border: 7px solid transparent;
}
.v-calendar .calendar .selected-field .prevDateButton::after {
  border-right: 10px solid #7b8187;
}
.v-calendar .calendar .selected-field .nextDateButton::after {
  border-left: 10px solid #7b8187;
}
.v-calendar .calendar .days {
  display: grid;
  grid-template-columns: repeat(7, calc(100%/7));
  border-radius: 6px;
}
.v-calendar .calendar .days .day {
  background: transparent;
  border: 0;
  text-align: center;
  padding: 10px;
  font-size: 0.8em;
  color: #7b8187;
  cursor: pointer;
}
.v-calendar .calendar .days .day.name {
  pointer-events: none;
}
.v-calendar .calendar .days .day.selectedDate {
  background: #1bba67;
  color: #fff;
}
.v-calendar .calendar .days .day.selectedRange:not(.selectedDate) {
  background: #f5fbff;
}
.v-calendar .calendar .days .day.disabledDate {
  opacity: 0.3;
  pointer-events: none;
}
.v-calendar .calendar .days .day.disabledDate.selectedRange {
  background: #f5fbff;
  opacity: 1;
}
.v-calendar .calendar .days .day.disabledDate.selectedRange span {
  opacity: 0.2;
}
.v-calendar .calendar .days .day:hover:not(.selectedDate) {
  background: #eaeaeb;
}
.v-calendar.left .content {
  left: 0;
  transform: translateY(10px);
}
.v-calendar.left .calendar:first-child::before {
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #eaeaeb transparent;
  left: 0;
}

.v-calendar.right .content {
  right: 0;
  transform: translateY(10px);
}
.v-calendar.right .calendar:first-child::before {
  right: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #eaeaeb transparent;
}

.v-calendar.top .content {
  top: 100%;
  transform: translateY(calc(-100% - 66px));
  box-shadow: 3px -14px 30px 0px rgba(0, 0, 0, .2);
}
.v-calendar.top .content .calendar:first-child::before {
  border-width: 10px;
  border-style: solid;
  border-color: #eaeaeb transparent transparent transparent;
  top: 100%;
  left: 0;
}

.v-calendar.bottom .content {
  transform: translateY(10px);
}
.v-calendar.bottom .content .calendar:first-child::before {
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #eaeaeb transparent;
  left: 0;
}

</style>
