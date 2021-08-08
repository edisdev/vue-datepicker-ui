---
footer: MIT Licensed | Copyright © 2021-Present Edisdev
pageClass: 'homepage'
---
<section style="text-align:center">

# Vue Datepicker UI

### A datepicker component for VueJs

<img src="datepicker.png" width="100%" style="margin:auto">

```bash
yarn add vue-datepicker-ui
```

or

```bash
npm install vue-datepicker-ui --save
```

<br/>

<div class="Datepickers">
  <div class="Datepicker">
    <Datepicker
      :value="new Date()"/>
  </div>

  <div class="Datepicker colorfull">
    <Datepicker
      circle
      :value="new Date()"/>
  </div>

  <div class="Datepicker dark">
    <Datepicker
      circle
      :value="new Date()"/>
  </div>

  <div class="Datepicker dark">
    <Datepicker
      circle
      range
      position="center"
      :value="[new Date(), new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)]"/>
  </div>
  
</div>

</section>