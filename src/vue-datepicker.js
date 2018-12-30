import VueDatePicker from './components/calendar.vue'

VueDatePicker.install = function (Vue) {
  Vue.component(VueDatePicker.name, VueDatePicker)
}

export default VueDatePicker