import { mount } from '@vue/test-utils'

import { BasicData } from './mockData'
import Calendar from '@/components/calendar.vue'

describe('Calender View', () => {
  describe('Single datepicker', () => {
    let wrapper

    beforeEach(() => {
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
    })

    afterEach(() => {
      wrapper.destroy()
    })

    test('is correct render', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    test('should be day count equal to 7', () => {
      const days = wrapper.findAll('.days > .name')
      expect(days.length).toBe(7)
    })

    test('should be day count of a month is between 28-31 ', () => {
      const allDaysInSelection = wrapper.findAll('.days-selection > .days > .day')
      const disabledDate = wrapper.findAll('.days-selection > .days > .disabledDate')

      const dayCountOfThisMonth = allDaysInSelection.length - disabledDate.length

      expect(dayCountOfThisMonth).toBeGreaterThanOrEqual(28)
      expect(dayCountOfThisMonth).toBeLessThanOrEqual(31)
    })

    test('should be able change view mode as years', async () => {
      const viewButton = wrapper.find('.viewButton')
      await viewButton.trigger('click')

      const years = wrapper.findAll('.year')
      expect(years.length).toBe(11)
    })
  })
})
