<template>
  <div id="app">
    <div class="titles">
      <h1>VUE DATEPICKER COMPONENT</h1>
      <div class="using">
        <div class="package">
          <span class="install">npm install vue-datepicker-ui</span> or
          <span class="install">yarn add vue-datepicker-ui</span>
        </div>
        <code class="code" v-html="exampleCode"> </code>
      </div>
      <div class="viewCode">
        <a href="https://github.com/edisdev/vue-datepicker-ui" target="_blank">
          View Github Repository
        </a>
        <p>Thank you so much in advance for stars & supports. 😍👍</p>
      </div>
    </div>
    <div class="lights">
      <div class="examples">
        <div class="example" v-for="(example, index) in examples" :key="index">
          <h3>{{ example.title }}</h3>
          <Datepicker
            v-model="example.value"
            :range="example.range"
            :lang="example.lang"
            :firstDayOfWeek="example.firstDayOfWeek"
            :input-class="example.inputClass"
            :position="example.position"
            :disabled-start-date="example.disabledStartDate"
            :text-format="example.textFormat"
            :date-format="example.dateFormat"
            :disabled-end-date="example.disabledEndDate"
            :disabled="example.disabled || false"
            :circle="example.circle || false"
          />
          <blockquote class="exam-props">
            <textarea :value="JSON.stringify(example, null, 2)" readonly>
            </textarea>
          </blockquote>
        </div>
      </div>
    </div>
    <div class="colorfulls">
      <h2 class="changeColors"></h2>
      <div class="examples colorfull">
        <div class="example" v-for="(example, index) in examples" :key="index">
          <h3>{{ example.title }}</h3>
          <Datepicker
            v-model="example.value"
            :range="example.range"
            :lang="example.lang"
            :firstDayOfWeek="example.firstDayOfWeek"
            :input-class="example.inputClass"
            :position="example.position"
            :disabled-start-date="example.disabledStartDate"
            :text-format="example.textFormat"
            :date-format="example.dateFormat"
            :disabled-end-date="example.disabledEndDate"
            :disabled="example.disabled || false"
            :circle="example.circle || false"
          />
          <blockquote class="exam-props">
            <textarea :value="JSON.stringify(example, null, 2)" readonly>
            </textarea>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "./components/datepicker.vue";

export default {
  name: "app",
  components: {
    Datepicker,
  },
  data() {
    return {
      exampleCode:
        '< Datepicker  <br> v-model="example.value" <br> :range="example.range" <br> :lang="example.lang" <br> :firstDayOfWeek="example.firstDayOfWeek" <br> :input-class="example.inputClass"  <br> :position="example.position" <br> :disabled-start-date="example.disabledStartDate" <br> :text-format="example.textFormat" <br> :date-format="example.dateFormat" <br> :disabled-end-date="example.disabledEndDate"/>',
      examples: [
        {
          title: "Single",
          inputClass: "exampleDatePicker",
          lang: "tr",
          position: "bottom",
          range: false,
          value: null,
          firstDayOfWeek: "monday",
        },
        {
          title: "Range",
          inputClass: "exampleDatePicker",
          lang: "tr",
          position: "bottom",
          range: true,
          value: [null, null],
          firstDayOfWeek: "monday",
        },
        {
          title: "Custom lang",
          inputClass: "exampleDatePicker",
          lang: "en",
          position: "right",
          range: true,
          value: [
            new Date(),
            new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
          ],
        },
        {
          title: "First Day Of Week",
          inputClass: "exampleDatePicker",
          lang: "en",
          position: "left",
          range: true,
          value: [
            new Date(),
            new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
          ],
          firstDayOfWeek: "sunday",
        },
        {
          title: "Selected Circle",
          inputClass: "exampleDatePicker",
          lang: "en",
          position: "left",
          range: true,
          value: [
            new Date(),
            new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
          ],
          firstDayOfWeek: "sunday",
          circle: true,
        },
        {
          title: "Disabled Status",
          inputClass: "exampleDatePicker",
          lang: "tr",
          position: "top",
          disabledStartDate: {
            to: new Date('01.02.2021'),
            from: new Date('02.02.2021')
          },
          value: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          title: "Date Options String",
          inputClass: "exampleDatePicker",
          lang: "en",
          position: "right",
          textFormat: "long",
          value: new Date(),
        },
        {
          title: "Showed Date Format",
          inputClass: "exampleDatePicker",
          lang: "en",
          position: "left",
          value: new Date(),
          dateFormat: { day: "2-digit", month: "2-digit", year: "numeric" },
        },
        {
          title: "Disabled Open Picker",
          inputClass: "exampleDatePicker",
          lang: "en",
          position: "left",
          value: new Date(),
          disabled: true,
          dateFormat: { day: "2-digit", month: "2-digit", year: "numeric" },
        },
      ],
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.titles {
  width: 98vw;
  border-bottom: 1px solid #dedeee;
  padding-bottom: 20px;
  text-align: center;
  height: 100%;
}
.titles .viewCode {
  margin-top: 10px;
}
.titles .viewCode a {
  color: #1bba67;
  font-weight: bold;
}
.titles .viewCode p {
  margin-top: 5px;
  font-weight: bold;
}
.titles .using {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.titles .using .package {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.titles .using .install {
  font-size: 16px;
  background: #000;
  border-radius: 4px;
  color: #ffb00f;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 30px;
}

.titles .using .code {
  background: #000;
  display: block;
  align-self: center;
  color: #1bba67;
  padding: 20px;
  font-size: 16px;
  border-radius: 4px;
  text-align: left;
  max-width: 94vw;
  word-break: break-all;
  margin-left: auto;
  margin-right: auto;
}

.examples {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}

.changeColors {
  margin-top: 30px;
  margin-bottom: 30px;
}

.lights,
.colorfulls {
  padding: 30px
}

.lights {
  background: #e4e4e4;
}
.colorfulls {
  background: #3a7c96;
  color: #fff;
}

.examples.colorfull {
  --v-calendar-picker-color: #E7F8FE;
  --v-calendar-input-bg-color:#E7F8FE;
  --v-calendar-select-bg-color: #E7F8FE;
  --v-calendar-border-color: #6ea9c43d;
  --v-calendar-triangle-color:#6ea9c43d;
  --v-calendar-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.2);
  --v-calendar-top-shadow: 3px -14px 30px 0px rgba(0, 0, 0, 0.2);
  --v-calendar-text-color:#6EA9C4;
  --v-calendar-action-color: #6EA9C4;
  --v-calendar-text-disabled-color: #6ea9c47c;
  --v-calendar-view-button-color:#6EA9C4;
  --v-calendar-datepicker-icon-color: transparent;
  --v-calendar-datepicker-icon-size: 1.1rem;
  --v-calendar-active-bg-color: #fff;
  --v-calendar-active-text-color:#323B43;
  --v-calendar-range-bg-color: #a1dbf5;
  --v-calendar-view-button-font-weight: 500;
  --v-calendar-view-button-font-size: 1.1rem;
  --v-calendar-range-text-color: #020202;
  --v-calendar-range-radius: 100%;
  --v-calendar-day-hover-bg-color:#6ea9c43d;
  --v-calendar-day-width: 45px;
  --v-calendar-day-height: 45px;
  --v-calendar-day-font-size: 0.9rem;
  --v-calendar-day-font-weight: 500;
  --v-calendar-input-border: 1px solid #6ea9c43d;
  --v-calendar-input-text-color: #323B43;
  --v-calendar-input-font-size: 0.9rem;
  --v-calendar-input-font-weight: 500;
  --v-calendar-content-radius: 6px;
  --v-calendar-day-name-font-size: 0.9rem;
  --v-calendar-day-name-font-weight: 600;
  --v-calendar-day-name-color:#323B43;
  --v-calendar-year-font-size: 1.1rem;
  --v-calendar-year-color: #6EA9C4;
  --v-calendar-year-font-weight: 500;
  --v-calendar-input-bg-disable-color:rgb(245, 245, 245);
  --v-calendar-input-text-disable-color:#b8b8b9;
  --v-calendar-year-disabled-color: #b8b8b9;
  --v-calendar-year-disabled-bg-color: transparent;
  --v-calendar-year-padding: 10px;
  --v-calendar-year-border: none;
  --v-calendar-year-border-radius: none;
  --v-calendar-month-font-size: 1.1rem;
  --v-calendar-month-color: #6EA9C4;
  --v-calendar-month-font-weight: 500;
  --v-calendar-month-disabled-color: #b8b8b9;
  --v-calendar-month-disabled-bg-color: transparent;
  --v-calendar-month-padding: 8px;
  --v-calendar-month-border: none;
  --v-calendar-month-border-radius: none;
}

.example {
  padding: 3vw;
  border-bottom: 1px solid #eaeaeb;
  max-width: 100%;
}

.example:nth-child(3n-1),
.example:nth-child(3n + 1) {
  border-right: 1px solid #eaeaeb;
}

.example h3 {
  margin-bottom: 20px;
}
.example .exam-props {
  height: 250px;
  margin-top: 20px;
}

.example .exam-props textarea {
  margin-top: 20px;
  height: 220px;
  padding: 7px;
  border-radius: 6px;
  border-color: #eaeaeb;
  resize: none;
  width: 95%;
  font-size: 13px;
}
</style>
