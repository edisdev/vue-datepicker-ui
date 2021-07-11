import { mount } from '@vue/test-utils'

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
})
