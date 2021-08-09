---
title: 'Examples'
---

# Examples


## value / modelValue
  **Single - Default**
  ```vue
  <template>
    <Datepicker v-model="new Date()"/>
  </template>
  ```
  <Datepicker :value="new Date()"/>

## range
  **Range - Default**
  ```vue
  <template>
    <Datepicker
      range
      v-model="selectedDate"
    />
  </template>

  <script>
  export default {
    data () {
      return {
        selectedDate: [
          new Date(),
          new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)]
      }
    }
  }
  </script>
  ```
  <Datepicker
    :value="[new Date(), new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)]"
    range/>

## lang
  **Change Datepicker Language**
  ```vue
  <template>
    <Datepicker v-model="new Date()" lang="en"/>
  </template>
  ```

  <Datepicker :value="new Date()" lang="en"/>

## firstDayOfWeek

 **Change First Day Of Week** (Default: 'Monday')
  ```vue
  <template>
    <Datepicker v-model="new Date()" first-day-of-week="sunday"/>
  </template>
  ```

  <Datepicker :value="new Date()" first-day-of-week="sunday"/>

## inputClass
  **Added Custom Input Class**
  ```vue
  <template>
    <Datepicker v-model="new Date()" input-class="customInputClass"/>
  </template>
  ```

  <Datepicker :value="new Date()" input-class="customInputClass"/>

## position
  **Change Picker Position** (Default: 'left')

  **Left**
  ```vue
  <template>
    <Datepicker v-model="new Date()" position="left"/>
  </template>
  ```
  <Datepicker :value="new Date()" position="left"/>

  **Right**
  ```vue
  <template>
    <Datepicker v-model="new Date()" position="right"/>
  </template>
  ```

  <Datepicker :value="new Date()" position="right"/>

  **Center**
  ```vue
  <template>
    <Datepicker v-model="new Date()" position="center"/>
  </template>
  ```

  <Datepicker :value="new Date()" position="center"/>
  
  **Top**
  ```vue
  <template>
    <Datepicker v-model="new Date()" position="top"/>
  </template>
  ```

  <Datepicker :value="new Date()" position="top"/>

## disabledStartDate
  **Make disabled single date:**
  to -> before this date
  from -> after this date

  ```vue
  <template>
    <Datepicker v-model="selectedDate" disabled-start-date="disabledStartDate"/>
  </template>

  <script>
  export default {
    data () {
      return {
        selectedDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
        disabledStartDate: {
          to: new Date('08.02.2021'),
          from: new Date('10.02.2021')
        }
      }
    }
  }
  </script>
  ```

  <Datepicker
    :value="new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)"
    :disabled-start-date="{
      to: new Date('08.02.2021'),
      from: new Date('10.02.2021')
    }"
  />

## disabledEndDate
   **Make disabled end date:**
  to -> before this date
  from -> after this date

  ```vue
  <template>
    <Datepicker
      v-model="selectedDate"
      disabled-end-date="disabledEndDate"
      range/>
  </template>

  <script>
  export default {
    data () {
      return {
        selectedDate: [
          new Date(),
          new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)
        ],
        disabledEndDate: {
          to: new Date('08.02.2021'),
          from: new Date('10.02.2021')
        }
      }
    }
  }
  </script>
  ```

  <Datepicker
    range
    :value="[new Date(),
            new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)]"
    :disabled-end-date="{
      to: new Date('08.02.2021'),
      from: new Date('10.02.2021')
    }"
  />

## textFormat
  
 **Change Text Format** (Short Or Long?)
  ```vue
  <template>
    <Datepicker v-model="new Date()" text-format="long"/>
  </template>
  ```

  <Datepicker :value="new Date()" text-format="long"/>


## dateFormat
  **Change Date Format**
  ```vue
  <template>
    <Datepicker
      v-model="new Date()"
      date-format="{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric' }"
    />
  </template>
  ```

  <Datepicker :value="new Date()" :date-format="{ day: '2-digit', month: '2-digit', year: 'numeric' }"/>

## disabled
  **Disable Calendar**
  ```vue
  <template>
    <Datepicker disabled/>
  </template>
  ```

  <Datepicker disabled/>

## placeholder
  **Change Placeholder**
  <br/>
  *Default: Select Date*
  ```vue
  <template>
    <Datepicker placeholder="Change Date"/>
  </template>
  ```

  <Datepicker  placeholder="Change Date"/>

## circle
  **Circle Selected Date**
  ```vue
  <template>
    <Datepicker
      circle
      v-model="new Date()"/>
  </template>
  ```

  <Datepicker
    circle
    :value="new Date()"/>

## showClearButton
  **selected date clear**
  ```vue
  <template>
    <Datepicker
      show-clear-button
      v-model="new Date()"/>
  </template>
  ```

  <Datepicker
    show-clear-button
    :value="new Date()"/>

## showPickerInital
  **picker show on mount**
  ```vue
  <template>
    <Datepicker
      show-picker-inital
      v-model="new Date()"/>
  </template>
  ```

  <Datepicker
    show-picker-inital
    :value="new Date()"/>
