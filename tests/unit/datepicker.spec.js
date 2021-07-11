import { mount } from '@vue/test-utils'
//
import { MODE_ENUMS } from '@/utils/modes'
//
import Datepicker from '@/components/datepicker.vue'

describe('Datepicker', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Datepicker)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('Correct Picker Value', () => {
    test('is correct value setting selected date', async () => {
      const value = new Date()
      await wrapper.setProps({ value })
      expect(wrapper.vm._data.selectedDate).toEqual(value)
    })

    test('is correct range value setting selected date', async () => {
      const value = [new Date(), new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)]
      await wrapper.setProps({ value })
      expect(wrapper.vm._data.selectedDate).toEqual(value)
    })

    test('is correct type range value', async () => {
      const value = [null, null]
      await wrapper.setProps({ value })
      expect(Array.isArray(wrapper.vm._data.selectedDate)).toEqual(true)
    })
  })

  describe('Datepicker Range Control', () => {
    beforeEach(() => {
      wrapper = mount(Datepicker, {
        propsData: {
          range: true
        }
      })
    })

    test('selected date is array', async () => {
      expect(Array.isArray(wrapper.vm._data.selectedDate)).toEqual(true)
    })

    test('multi range datepicker render', async () => {
      const dpInput = wrapper.find('.input-field input')
      await dpInput.trigger('click')

      const calendars = wrapper.findAll('.calendar')

      expect(calendars.length).toEqual(2)
    })
  })

  describe('Show Clear Button', () => {
    beforeEach(() => {
      wrapper = mount(Datepicker, {
        propsData: {
          showClearButton: true
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    test('not show when value is empty', () => {
      const clearButton = wrapper.find('.clearButton')
      expect(clearButton.exists()).toBe(false)
    })

    test('show when value is not empty', async () => {
      await wrapper.setProps({ value: new Date() })
      const clearButton = wrapper.find('.clearButton')

      expect(clearButton.exists()).toBe(true)
    })

    test('clear button worked is correct', async () => {
      await wrapper.setProps({ value: new Date() })

      const clearButton = wrapper.find('.clearButton')
      await clearButton.trigger('click')

      expect(wrapper.vm._data.selectedDate).toEqual(null)
    })
  })

  describe('Formatted Value', () => {
    test('is correct format', async () => {
      await wrapper.setProps({
        value: '07.24.2021'
      })

      expect(wrapper.vm.formattedValue).toBe('Jul 24, 2021')
    })

    test('is correct format is range', async () => {
      await wrapper.setProps({
        value: ['07.24.2021', '08.28.2021'],
        range: true
      })

      expect(wrapper.vm.formattedValue).toBe('Jul 24, 2021 ~ Aug 28, 2021')
    })
  })

  describe('Prev Action', () => {
    test('prev action worked is correct', async () => {
      await wrapper.setProps({
        value: '07.24.2021'
      })

      wrapper.vm.prevMonth('start')
      expect(wrapper.vm.currentDate.month).toEqual(5)
    })

    test('prev action worked is correct for secondary calendar', async () => {
      await wrapper.setProps({
        value: ['07.24.2021', '08.28.2021'],
        range: true
      })

      wrapper.vm.prevMonth('end')
      expect(wrapper.vm.currentDateEnd.month).toEqual(6)
    })

    test('prev action set date correct for first month', async () => {
      await wrapper.setProps({
        value: '01.20.2021'
      })

      wrapper.vm.prevMonth('start')
      expect(wrapper.vm.currentDate.month).toEqual(11)
    })
  })

  describe('Next Action', () => {
    test('next action worked is correct', async () => {
      await wrapper.setProps({
        value: '07.24.2021'
      })

      wrapper.vm.nextMonth('start')
      expect(wrapper.vm.currentDate.month).toEqual(7)
    })

    test('next action worked is correct for secondary calendar', async () => {
      await wrapper.setProps({
        value: ['07.24.2021', '08.28.2021'],
        range: true
      })

      wrapper.vm.nextMonth('end')
      expect(wrapper.vm.currentDateEnd.month).toEqual(8)
    })

    test('next action set date correct for first month', async () => {
      await wrapper.setProps({
        value: '12.20.2020'
      })

      wrapper.vm.nextMonth('start')
      expect(wrapper.vm.currentDate.month).toEqual(0)
    })
  })

  describe('Change View Mode', () => {
    test('was changed primary calendar mode correctly', async () => {
      await wrapper.vm.changeViewMode({ mode: MODE_ENUMS.MONTH, picker: 'start' })

      expect(wrapper.vm.calendarView).toEqual(MODE_ENUMS.MONTH)
    })

    test('was changed secondary calendar mode correctly', async () => {
      await wrapper.setProps({ range: true })
      await wrapper.vm.changeViewMode({ mode: MODE_ENUMS.MONTH, picker: 'end' })

      expect(wrapper.vm.calendarEndView).toEqual(MODE_ENUMS.MONTH)
    })
  })

  describe('Set UniqYear Action', () => {
    test('was changed current date year correctly', async () => {
      await wrapper.vm.setUniqYear({ year: 2022, picker: 'start' })
      expect(wrapper.vm.currentDate.year).toEqual(2022)
    })

    test('was changed current date year correctly for secondary calendar', async () => {
      await wrapper.setProps({ range: true })
      await wrapper.vm.setUniqYear({ year: 2022, picker: 'end' })

      expect(wrapper.vm.currentDateEnd.year).toEqual(2022)
    })
  })

  describe('Set Year Action', () => {
    test('was changed current date year correctly', async () => {
      await wrapper.vm.setYear({ year: 2022, picker: 'start' })

      expect(wrapper.vm.currentDate.year).toEqual(2022)
      expect(wrapper.vm.calendarView).toEqual(MODE_ENUMS.MONTH)
    })

    test('was changed current date year correctly for secondary calendar', async () => {
      await wrapper.setProps({ range: true })
      await wrapper.vm.setYear({ year: 2022, picker: 'end' })

      expect(wrapper.vm.currentDateEnd.year).toEqual(2022)
      expect(wrapper.vm.calendarEndView).toEqual(MODE_ENUMS.MONTH)
    })
  })

  describe('Set Years Action', () => {
    test('primary calendar prev action is correct', async () => {
      await wrapper.setProps({ value: '07.24.2021' })
      await wrapper.vm.setYears({ route: 'prev', picker: 'start' })

      expect(wrapper.vm.currentDate.year).toBe(2010)
    })

    test('primary calendar next action is correct', async () => {
      await wrapper.setProps({ value: '07.24.2021' })
      await wrapper.vm.setYears({ route: 'next', picker: 'start' })

      expect(wrapper.vm.currentDate.year).toBe(2032)
    })

    test('secondary calendar prev action is correct', async () => {
      await wrapper.setProps({
        value: ['07.24.2021', '08.28.2021'],
        range: true
      })
      await wrapper.vm.setYears({ route: 'prev', picker: 'end' })

      expect(wrapper.vm.currentDateEnd.year).toBe(2010)
    })

    test('secondary calendar next action is correct', async () => {
      await wrapper.setProps({
        value: ['07.24.2021', '08.28.2021'],
        range: true
      })
      await wrapper.vm.setYears({ route: 'next', picker: 'end' })

      expect(wrapper.vm.currentDateEnd.year).toBe(2032)
    })
  })

  describe('Set Month  Action', () => {
    test('was changed current date month correctly', async () => {
      await wrapper.vm.setMonth({ month: 11, picker: 'start' })

      expect(wrapper.vm.currentDate.month).toEqual(11)
      expect(wrapper.vm.calendarView).toEqual(MODE_ENUMS.DAY)
    })

    test('was changed current date month correctly for secondary calendar', async () => {
      await wrapper.setProps({ range: true })
      await wrapper.vm.setMonth({ month: 11, picker: 'end' })

      expect(wrapper.vm.currentDateEnd.month).toEqual(11)
      expect(wrapper.vm.calendarEndView).toEqual(MODE_ENUMS.DAY)
    })
  })

  describe('handler Date Action', () => {
    test('was changed current date year correctly', async () => {
      const fullDate = new Date()
      await wrapper.vm.handlerDate({ fullDate, picker: 'start' })
      expect(wrapper.vm.selectedDate).toBe(fullDate)
    })

    test('was changed current date year correctly for secondary calendar', async () => {
      await wrapper.setProps({ range: true, value: [null, null] })
      const startDate = new Date()
      const endDate = new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)

      await wrapper.vm.handlerDate({ fullDate: startDate, picker: 'start' })
      await wrapper.vm.handlerDate({ fullDate: endDate, picker: 'end' })

      expect(wrapper.vm.selectedDate).toEqual([startDate, endDate])
    })
  })

  describe('Click Event OutSide', () => {
    const TestComponent = {
      template: `<div class="testComponent">
      <span id="OtherTemplate">other template</span>
       <Datepicker/>
      </div>`,
      components: {
        Datepicker
      }
    }

    const BigWrapper = mount(TestComponent, {
      attachTo: document.body
    })

    test('outside click event worked is correct', async () => {
      const picker = BigWrapper.find('.v-calendar')
      const OtherTemplate = BigWrapper.find('#OtherTemplate')

      picker.setData({ isShowPicker: true })

      await OtherTemplate.trigger('click')
      expect(picker.vm.isShowPicker).toBe(false)
    })

    test('outside click event worked is correct', async () => {
      const picker = BigWrapper.find('.v-calendar')

      await picker.setData({ isShowPicker: true })
      const triggerTemplate = BigWrapper.find('.v-calendar .calendar .selected-field')

      await triggerTemplate.trigger('click')
      expect(picker.vm.isShowPicker).toBe(true)
    })
  })
})
