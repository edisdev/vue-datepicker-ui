<template>
  <div class="calendar" :class="{ textLong: textFormat === 'long', range }">
    <div class="selected-field">
      <div class="selected-date">
        <button class="prevDateButton" type="button" @click="prev"></button>
        <button
          type="button"
          class="viewButton"
          @click="changeViewMode('years')"
        >
          {{ viewButtonText }}
        </button>
        <button class="nextDateButton" type="button" @click="next"></button>
      </div>
      <div v-if="isDayMode" class="days">
        <div
          class="day name"
          v-for="day in calendar.days"
          :key="`${day.dayNumber}-day`"
        >
          {{ day.name }}
        </div>
      </div>
    </div>
    <div class="days-selection">
      <div v-if="isDayMode" class="days">
        <button
          class="day"
          v-for="(mDay, index) in calendar.daysOfMonth"
          :key="`${index}-mounthday`"
          @click="handlerDate(mDay.fullDate)"
          type="button"
          :class="[
            { disabledDate: !mDay.isDayInMouth || !mDay.isUsable },
            {
              selectedDate: formatDate(selectPickerDate) === mDay.date,
            },
            { selectedRange: isInSelectedDate(mDay.fullDate) },
            { circle },
          ]"
        >
          <span class="number">{{ mDay.day }}</span>
        </button>
      </div>
      <div class="viewmode">
        <div class="years" v-show="viewMode === 'years'">
          <button
            v-for="y in years"
            :key="y.year"
            type="button"
            class="year"
            :disabled="y.disable"
            @click="setYear(y.year)"
          >
            {{ y.year }}
          </button>
        </div>
        <div class="months" v-show="viewMode === 'months'">
          <button
            v-for="month in months"
            :key="month.index"
            type="button"
            class="month"
            :disabled="month.disable"
            @click="setMonth(month.index)"
          >
            {{ month.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    calendar: {
      type: Object,
      required: true,
    },
    currentDate: {
      type: Object,
      required: true,
    },
    formatDate: {
      type: Function,
      required: true,
    },
    selectedDate: {
      required: true,
    },
    range: {
      type: Boolean,
    },
    textFormat: {
      type: String,
      required: true,
    },
    pickerType: {
      type: String,
      default: "start",
    },
    circle: {
      type: Boolean,
      default: false,
    },
    viewMode: {
      type: String,
    },
    rangeSeperator: {
      type: String,
    },
    disableDate: {},
  },
  computed: {
    selectPickerDate() {
      if (this.range)
        return this.pickerType === "start"
          ? this.selectedDate[0]
          : this.selectedDate[1];
      else return this.selectedDate;
    },
    isDayMode() {
      return this.viewMode === "days";
    },
    yearsRange() {
      let years = this.calendar.years;
      return years[0] + this.rangeSeperator + years[years.length - 1];
    },
    dayViewText() {
      return (
        this.calendar.months[this.currentDate.month].name +
        " " +
        this.currentDate.year
      );
    },
    viewButtonText() {
      let text;
      switch (this.viewMode) {
        case "years":
          text = this.yearsRange;
          break;
        case "months":
          text = this.currentDate.year;
          break;
        default:
          text = this.dayViewText;
      }
      return text;
    },
    years() {
      return this.calendar.years.map((y) => {
        let disable =
          (!!this.disableDate &&
            !!this.disableDate.from &&
            new Date(this.disableDate.from).getFullYear() < y) ||
          (!!this.disableDate.to &&
            new Date(this.disableDate.to).getFullYear() > y);
        return {
          year: y,
          disable,
        };
      });
    },
    months() {
      let { year } = this.currentDate;
      let endDate = new Date(this.disableDate.to)
      let startDate = new Date(this.disableDate.from)

      return this.calendar.months.map((m) => {
        let disable = true
        if (this.range) {
          disable = (!!this.disableDate.to &&
             endDate.getMonth() > m.index &&
             endDate.getFullYear() <= year) ||
           (!!this.disableDate.from &&
             startDate.getMonth() > m.index &&
             startDate.getFullYear() <= year);
        } else {
          disable = (this.disableDate.from &&
             startDate.getMonth() < m.index &&
             startDate.getFullYear() <= year)
        }
        return {
          disable,
          ...m,
        };
      });
    },
  },
  methods: {
    getDate(date) {
      return new Date(date).setHours(0, 0, 0, 0);
    },
    isInSelectedDate(date) {
      if (!this.range) return null;
      let selectedDate1 = this.getDate(this.selectedDate[0]);
      let selectedDate2 = this.getDate(this.selectedDate[1]);
      let currentDate = this.getDate(date);

      return selectedDate1 <= currentDate && selectedDate2 >= currentDate;
    },
    handlerDate(fullDate) {
      this.$emit("handlerDate", { fullDate, picker: this.pickerType });
    },
    prev() {
      switch (this.viewMode) {
        case "days":
          this.$emit("prevMonth", this.pickerType);
          break;
        case "months":
          this.$emit("setUniqYear", {
            year: this.currentDate.year - 1,
            picker: this.pickerType,
          });
          break;
        case "years":
          this.$emit("setYears", { route: "prev", picker: this.pickerType });
      }
    },
    next() {
      switch (this.viewMode) {
        case "days":
          this.$emit("nextMonth", this.pickerType);
          break;
        case "months":
          this.$emit("setUniqYear", {
            year: this.currentDate.year + 1,
            picker: this.pickerType,
          });
          break;
        case "years":
          this.$emit("setYears", { route: "next", picker: this.pickerType });
      }
    },
    changeViewMode(mode) {
      this.$emit("changeViewMode", { mode, picker: this.pickerType });
    },
    setYear(year) {
      this.$emit("setYear", { year, picker: this.pickerType });
    },
    setMonth(month) {
      this.$emit("setMonth", { month, picker: this.pickerType });
    },
  },
};
</script>
