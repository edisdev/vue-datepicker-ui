import { mount } from '@vue/test-utils'

import { BasicData } from './mockData'
import Calendar from '@/components/calendar.vue'

let wrapper

describe('Calender View', () => {
  wrapper = mount(Calendar, {
    propsData: {
      calendar: BasicData.calendar,
      currentDate: BasicData.currentDate,
      selectedDate: BasicData.currentDate,
      range: BasicData.range,
      textFormat: BasicData.textFormat,
      disableDate: BasicData.disableDate,
      formatDate: BasicData.formatDate,
      viewMode: BasicData.viewMode
    }
  })

  test('is correct render', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
