---
title: 'Using'

---

## VUE 2

### 1- Global Register

```javascript
// main.js file

import VueDatepickerUi from 'vue-datepicker-ui'
import 'vue-datepicker-ui/lib/vuedatepickerui.css';

Vue.component('Datepicker', VueDatepickerUi)
```

### 2- Special Register

```vue
<template>
  <Datepicker ...props>
</template>

<script>
  // special component - vue file

  import 'vue-datepicker-ui/lib/vuedatepickerui.css';
  import VueDatepickerUi from 'vue-datepicker-ui';

  export default {
    components: {
      Datepicker: VueDatepickerUi
    }
  }
</script>

```

## VUE 3

### 1- Global Register

```javascript
// main.js file

import VueDatepickerUi from 'vue-datepicker-ui'
import 'vue-datepicker-ui/lib/vuedatepickerui.css';

const app = create(App).mount('#app')
app.component('Datepicker', VueDatepickerUi)
```

### 2- Special Register

```vue
<template>
  <Datepicker ...props>
</template>

<script>
  // special component - vue file

  import 'vue-datepicker-ui/lib/vuedatepickerui.css';
  import VueDatepickerUi from 'vue-datepicker-ui';

  export default {
    components: {
      Datepicker: VueDatepickerUi
    }
  }
</script>

```