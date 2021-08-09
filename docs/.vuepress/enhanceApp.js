import Datepicker from '@/components/datepicker.vue';
import Calendar from '@/components/calendar.vue'

import './datepickerExample.css';


export default ({ Vue }) => {
  Vue.component('Datepicker', Datepicker)
  Vue.component('Calendar', Calendar)
};
