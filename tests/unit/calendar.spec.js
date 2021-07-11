import { mount } from '@vue/test-utils'
//
import { BasicData } from './mockData'
import { MODE_ENUMS } from '@/utils/modes'
//
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

    test('there should be a calendar', () => {
      const calendar = wrapper.findAll('.calendar')
      expect(calendar.length).toBe(1)
    })

    test('should be called handlerDate when selected a date', async () => {
      const mockHandlerDate = jest.spyOn(wrapper.vm, 'handlerDate')

      const fifthDay = wrapper.findAll('.days-selection > .days > .day').at(6)
      await fifthDay.trigger('click')

      expect(mockHandlerDate).toHaveBeenCalled()
    })

    test('should can be set years', async () => {
      const currentYear = new Date().getFullYear()

      const viewButton = wrapper.find('.viewButton')
      await viewButton.trigger('click')

      const currentYearButton = wrapper.findAll('.year').at(0)
      await currentYearButton.trigger('click')

      expect(wrapper.emitted().setYear).toEqual([[{ year: currentYear, picker: 'start' }]])
    })

    test('should can be set months', async () => {
      const viewButton = wrapper.find('.viewButton')
      await viewButton.trigger('click')

      const firstYear = wrapper.findAll('.year').at(0)
      await firstYear.trigger('click')

      const secondMonth = wrapper.findAll('.month').at(1)
      await secondMonth.trigger('click')

      expect(wrapper.emitted().setMonth).toEqual([[{ month: 1, picker: 'start' }]])
    })

    test('should can select next month when clicked next button while viewMode is days', async () => {
      const viewButton = wrapper.find('.viewButton')
      await viewButton.trigger('click')

      const nextDateButton = wrapper.find('.nextDateButton')
      await nextDateButton.trigger('click')

      expect(wrapper.emitted().nextMonth).toEqual([['start']])
    })

    test('should can select prev month when clicked prev button while viewMode is days', async () => {
      const viewButton = wrapper.find('.viewButton')
      await viewButton.trigger('click')

      const prevDateButton = wrapper.find('.prevDateButton')
      await prevDateButton.trigger('click')

      expect(wrapper.emitted().prevMonth).toEqual([['start']])
    })

    test('should can select next year when clicked next button while viewMode is months', async () => {
      await wrapper.setProps({ viewMode: MODE_ENUMS.MONTH })

      const nextDateButton = wrapper.find('.nextDateButton')
      await nextDateButton.trigger('click')

      expect(wrapper.emitted().setUniqYear).toEqual([[{ year: BasicData.currentDate.year + 1, picker: 'start' }]])
    })

    test('should can select prev year when clicked prev button while viewMode is months', async () => {
      await wrapper.setProps({ viewMode: MODE_ENUMS.MONTH })

      const prevDateButton = wrapper.find('.prevDateButton')
      await prevDateButton.trigger('click')

      expect(wrapper.emitted().setUniqYear).toEqual([[{ year: BasicData.currentDate.year - 1, picker: 'start' }]])
    })

    test('should can set next years when clicked next button while viewMode is years', async () => {
      await wrapper.setProps({ viewMode: MODE_ENUMS.YEAR })

      const nextDateButton = wrapper.find('.nextDateButton')
      await nextDateButton.trigger('click')

      expect(wrapper.emitted().setYears).toEqual([[{ route: 'next', picker: 'start' }]])
    })

    test('should can set prev years when clicked prev button while viewMode is years', async () => {
      await wrapper.setProps({ viewMode: MODE_ENUMS.YEAR })

      const prevDateButton = wrapper.find('.prevDateButton')
      await prevDateButton.trigger('click')

      expect(wrapper.emitted().setYears).toEqual([[{ route: 'prev', picker: 'start' }]])
    })
  })
})
