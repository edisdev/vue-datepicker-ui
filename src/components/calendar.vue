<template>
  <section class="v-calendar" :class="[position, {'long': range}]">
    <div class="input-field" :class="{'long': range}">
      <input
      type="text" 
      :class="[inputClass]" 
      :placeholder="placeholder"
      @click="isShowPicker= !isShowPicker"
      :disabled="disabled"
      :value="formattedValue" readonly/>
      <svg class="datepicker" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"></path>
      </svg>
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
import Calendar from 'calendar-data-generate'

export default {
  name: 'VueDatePicker',
  data() {
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
      selectedDate: this.range ? [null, null] : null,
      calendarView: 'days',
      calendarEndView: 'days'
    }
  },
  props: {
    value: {},
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
      validator: val => ['monday', 'sunday'].indexOf(val) > -1,
      default: 'monday'
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Select Date'
    }
  },
  computed: {
    disabledStartDateCalc () {
      const unSelectedDate = {
        from: null,
        to: null
      }
      if (this.range) {
        let endDate = this.selectedDate[1]
        let disabledDate = endDate ? new Date(endDate) : null
        disabledDate = (!this.disabledStartDate.from || disabledDate.getTime() < this.disabledStartDate.from.getTime()) ? disabledDate : this.disabledStartDate.from
        unSelectedDate.from = disabledDate
        unSelectedDate.to = this.disabledStartDate.from
      }
      return unSelectedDate
    },
    disabledEndDateCalc() {
      const unSelectedDate = {
        from: null,
        to: null
      }
      if (this.range) {
        let disabledDate = new Date(this.selectedDate[0])
        disabledDate = (!this.disabledEndDate.to || disabledDate.getTime() > this.disabledEndDate.to.getTime()) ? disabledDate : this.disabledEndDate.to
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
        this.disabledEndDateCalc
      )
    },
    formattedValue () {
      if (!this.range) {
        return this.formatDate(this.selectedDate)
      }
      else if (this.selectedDate.filter(Boolean).length != 2) return null
      return `${this.formatDate(this.selectedDate[0])} ${this.rangeSeperator} ${this.formatDate(this.selectedDate[1])}`
    }
  },
  methods: {
    formatDate(value) {
      if (!value) return null
      if (this.range && this.value.filter(Boolean).length === 0 ) return null
      return new Date(value).toLocaleDateString(this.lang, { ...this.dateFormat })
    },
    prevMount(picker) {
      const currentDate = picker === 'start' ? this.currentDate : this.currentDateEnd
      currentDate.month = currentDate.month - 1
      if (currentDate.month === -1) {
        currentDate.year = currentDate.year - 1
        currentDate.month = 11
      }
    },
    nextMount(picker) {
      const currentDate = picker === 'start' ? this.currentDate : this.currentDateEnd
      currentDate.month = currentDate.month + 1
      if (currentDate.month === 12) {
        currentDate.year = currentDate.year + 1
        currentDate.month = 0
      }
    },
    handlerDate(fullDate, picker = null) {
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
    setDate(selectedDates) {
      this.selectedDate = selectedDates
      this.emitInputAction()
    },
    emitInputAction () {
      this.$emit('input', this.selectedDate)
      if (this.range) {
        if (this.selectedDate.filter(Boolean).length === 2) this.close()
      } else {
        this.close()
      }
    },
    isInSelectedDate (date) {
      if (!this.range) return null
      return new Date(this.selectedDate[0]).getTime() <= date.getTime() && new Date(this.selectedDate[1]).getTime() >= date.getTime()
    },
    close () {
      this.isShowPicker = false
    },
    setCurrents () {
      if (this.range) {
        if (this.value[0]) {
          this.currentDate.year = new Date(this.value[0]).getFullYear()
          this.currentDate.month = new Date(this.value[0]).getMonth()
          this.currentDate.date = new Date(this.value[0]).getDate()
        }
        if (this.value[1]) {
          this.currentDateEnd.year = new Date(this.value[1]).getFullYear()
          this.currentDateEnd.month = new Date(this.value[1]).getMonth()
          this.currentDateEnd.date = new Date(this.value[1]).getDate()
        }
      } else if (this.value) {
        this.currentDate.year = new Date(this.value).getFullYear()
        this.currentDate.month = new Date(this.value).getMonth()
        this.currentDate.date = new Date(this.value).getDate()
      }
    }
  },
  mounted () {
    this.setCurrents()
    this.setDate(this.value)
    this.$watch('value', () => {
      this.setCurrents()
      this.setDate(this.value)
    })
    this.$watch('selectedDate', (value) => {
      if (!value && this.value === value) return
      this.$emit('change', value)
    })
    window.addEventListener('click', (e) => {
      const Datepicker = this.$el
      const isThis = Datepicker.contains(e.target)
      if (!isThis) this.close()
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

.v-calendar .input-field input:disabled ~ svg {
  fill: #7b8187;
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
  width: max-content;

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
  grid-template-columns: repeat(7, minmax(max-content, 1fr));
  border-radius: 6px;
}
.v-calendar .calendar .days .day {
  background: transparent;
  border: 0;
  text-align: center;
  padding: 7px;
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
