<template>
  <div id="app">
    <div class="titles">
      <h1>VUE DATEPCIKER COMPONENT</h1>
      <div class="using">
        <div>
          <span class="install">npm install vue-datepicker-component</span> or 
          <span class="install">yarn add vue-datepicker-component</span>
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
        { title: 'Custom lang, First day of week',
          inputClass: 'exampleDatePicker',
          lang: 'en',
          position: 'right',
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
          position: 'left',
          textFormat: 'long',
          value: new Date()
        },
        { title: 'Showed Date Format',
          inputClass: 'exampleDatePicker',
          lang: 'en',
          position: 'right',
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
  display: flex;
  width: 98vw;
  padding-top: 50px;
  padding-bottom: 200px;
  padding-left: 2vw;
  padding-right: 2vw;
  flex-wrap: wrap;
}
.titles {
  width: 98vw;
  border-bottom: 1px solid #dedeee;
  padding-bottom: 20px;
  text-align: center;
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
.titles .using .install{
  font-size: 16px;
  background: #000;
  border-radius: 4px;
  color: #ffb00f;
  padding: 10px;
}
.titles .using .code {
  width: 40%;
  background: #000;
  display: block;
  align-self: center;
  color: #1bba67;
  padding: 20px;
  font-size: 16px;
  margin-top: 30px;
  border-radius: 4px;
  text-align: left;
}

.example {
  padding-left: 3vw;
  min-width: 30vw;
  padding-top: 30px;
  border-bottom: 1px solid #eaeaeb;
}
.example:nth-child(3n-1) , .example:nth-child(3n) {
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
  height: 200px;
  padding: 7px;
  border-radius: 6px;
  border-color: #eaeaeb;
  resize: none;
  width: 95%;
}
</style>
