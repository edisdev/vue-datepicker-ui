---
title: 'Props'
---

# Props
``` html
   <Datepicker 
    v-model="" 
    :range="" 
    :lang="" 
    :firstDayOfWeek="" 
    :input-class="" 
    :position="" 
    :disabled-start-date="" 
    :disabled-end-date=""
    :text-format="" 
    :date-format=""
    :disabled=""
    :placeholder=""
    :circle=""
    :show-clear-button=""
    :show-picker-inital=""/>
```

Prop | Type | Value |  Default
------------- | ------------- | ------------- | -------------
value/modelValue (v-model) | Object | Date or Array for range | {}
range | Boolean | - | false
lang | String | Supports all languages / iso code language | tr
firstDayOfWeek | String | monday or sunday | monday
inputClass | String | classname for input | -
position | String | options = top, bottom, left, right, center | left
disabled-start-date | Object | This object consists of the start and end information(from and to params). ( For single status and range status of startDate). | { from: null, to: null}
disabled-end-date | Object | It has the same with disabled-start-end. (For range status of end Date. Ignored in single status.) | { from: null, to: null}
text-format | String | Short And Long / Short and long formats of month and day names | -
date-format | Object | This is the format in which the selected date will be displayed to the user. | { day: '2-digit', month: 'long', year: 'numeric' }
disabled | Boolean | This parameter is the datepicker prevents opening | false
placeholder | String | Input placeholder | Select Date
circle | Boolean | This is selected are circle or area | false
showClearButton | Boolean | This property is If there is a selected date, it allows the button used to delete this date to be displayed or not. | false
showPickerInital | Booelan | Show picker for on mounted | false


## value / modelValue
  Date or Array for range.
  
  :::tip
    This property is migrate `modelValue` for Vue 3.
  :::
## range
  Multi picker for start date or end date

## lang
  Datepicker language. This is HTML Language ISO Code

## firstDayOfWeek
  This property is determines the first day of the week as Monday or Sunday.

## inputClass
  Calendar input custom class

## position
  Position is the opening direction of the calendar.

## disabledStartDate
  This object consists of the start and end information(from and to params). ( For single status and range status of startDate). | { from: null, to: null}

## disabledEndDate
  It has the same with disabled-start-end. (For range status of end Date. Ignored in single status.) | { from: null, to: null}

## textFormat
  This property determines whether month and day names are formed in short or long form

## dateFormat
  This is the format in which the selected date will be displayed to the user.
  
  ::: tip
  object values is consists to toLocaleString in js.
  [Mozilla Ref](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
  :::

## disabled
  This property is used to disable the picker from popping up.

## placeholder
  Input placeholder

## circle
  This property is make circle to selected area.

## showClearButton
  This property is used for if there is a selected date, it allows the button used to delete this date to be displayed or not.

## showPickerInital
  This property is used to have the picker on when the calendar was mounted.
