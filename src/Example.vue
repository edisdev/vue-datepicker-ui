<template>
  <div id="app">
    <div class="titles">
      <h1>VUE DATEPCIKER COMPONENT</h1>
      <div class="using">
        <div class="package">
          <span class="install">npm install vue-datepicker-ui</span> or 
          <span class="install">yarn add vue-datepicker-ui</span>
        </div>
        <code class="code" v-html="exampleCode">
        </code>
      </div>
      <div class="viewCode">
        <a href="https://github.com/edisdev/vue-datepicker-ui" target="_blank">
          View Github Repository
        </a>
        <p>Thank you so much in advance for stars & supports. 😍👍
        </p>
      </div>
    </div>
    <div class="examples">
      <div class="example"
      v-for="(example,index) in examples"
      :key="index">
        <h3>{{ example.title }}</h3>
        <Calendar
        v-model="example.value"
        :range="example.range"
        :lang="example.lang"
        :firstDayOfWeek="example.firstDayOfWeek"
        :input-class="example.inputClass"
        :position="example.position"
        :disabled-start-date="example.disabledStartDate"
        :text-format="example.textFormat"
        :date-format="example.dateFormat"
        :disabled-end-date="example.disabledEndDate"/>
        <blockquote class="exam-props">
        <textarea :value="JSON.stringify(example, null, 2)" readonly>
          </textarea>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from './components/calendar.vue'

export default {
  name: 'app',
  components: {
    Calendar
  },
  data() {
    return {
      exampleCode: '< Calendar  <br> v-model="example.value" <br> :range="example.range" <br> :lang="example.lang" <br> :firstDayOfWeek="example.firstDayOfWeek" <br> :input-class="example.inputClass"  <br> :position="example.position" <br> :disabled-start-date="example.disabledStartDate" <br> :text-format="example.textFormat" <br> :date-format="example.dateFormat" <br> :disabled-end-date="example.disabledEndDate"/>',
      examples: [
        { title: 'Single',
          inputClass: 'exampleDatePicker',
          lang: 'tr',
          position: 'bottom',
          range: false,
          value: new Date(),
          firstDayOfWeek: 'monday'
        },
        { title: 'Range',
          inputClass: 'exampleDatePicker',
          lang: 'tr',
          position: 'bottom',
          range: true,
          value: [new Date(), new Date(new Date().getTime() + ( 9 * 24 * 60 * 60 * 1000))],
          firstDayOfWeek: 'monday'
        },
        { title: 'Custom lang',
          inputClass: 'exampleDatePicker',
          lang: 'en',
          position: 'right',
          range: true,
          value: [new Date(), new Date(new Date().getTime() + ( 9 * 24 * 60 * 60 * 1000))]
        },
        { title: 'First Day Of Week',
          inputClass: 'exampleDatePicker',
          lang: 'en',
          position: 'left',
          range: true,
          value: [new Date(), new Date(new Date().getTime() + ( 9 * 24 * 60 * 60 * 1000))],
          firstDayOfWeek: 'sunday'
        },
        { title: 'Disabled Status',
          inputClass: 'exampleDatePicker',
          lang: 'ar',
          position: 'top',
          disabledStartDate: {
            to: new Date(new Date().getTime() - ( 20 * 24 * 60 * 60 * 1000)),
            from: new Date(new Date().getTime() - ( 1 * 24 * 60 * 60 * 1000))
          },
          value: new Date(new Date().getTime() - ( 5 * 24 * 60 * 60 * 1000))
        },
        { title: 'Date Options String',
          inputClass: 'exampleDatePicker',
          lang: 'en',
          position: 'right',
          textFormat: 'long',
          value: new Date()
        },
        { title: 'Showed Date Format',
          inputClass: 'exampleDatePicker',
          lang: 'en',
          position: 'left',
          value: new Date(),
          dateFormat: {day: '2-digit', month: '2-digit', year: 'numeric'}
        },
      ]
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 50px;
  padding-bottom: 200px;
  background: #b1b8be73;
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
.titles .using .install{
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
  grid-template-columns: repeat(auto-fill, minmax(350px,1fr));
}
.example {
  padding: 3vw;
  border-bottom: 1px solid #eaeaeb;
  max-width: 100%;
}
.example:nth-child(3n-1) , .example:nth-child(3n+1) {
  border-right: 1px solid #eaeaeb;
}
.example  h3 {
  margin-bottom: 20px;
}
.example .exam-props {
  height: 250px;
  margin-top: 20px;
}

.example .exam-props textarea{
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
