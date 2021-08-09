import Datepicker from '@/components/datepicker.vue';
import Calendar from '@/components/calendar.vue'

import './datepickerExample.css';

export default ({ app }) => {
  app.component('Datepicker', Datepicker)
  app.component('Calendar', Calendar)
};
