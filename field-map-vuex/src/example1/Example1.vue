<template>
  <div id="example1">
    <h1>Text1: <span>{{ text1 }}</span></h1>
    <div class="input">
      <input type="text" v-model="text1">
    </div>

    <div class="hr"></div>

    <h1>Text2: <span>{{ text2 }}</span></h1>
    <div class="input">
      <input type="text" v-model="text2">
    </div>

    <div class="hr"></div>

    <test></test>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import Test from './components/Test'

export default {
  name: 'Example1',
  components: { Test },
  computed: {
    ...mapFields([
      "text1",
      "text2"
    ])
  }
}
</script>
<!--
<style>
:root {
  --color-black: #221E22;
  --color-grey: #484A47;
  --color-white: #E8E8E8;
  --color-red: #832232;
  --color-blue: #007FFF;
  --color-green: #1AFFD5;
  --color-yellow: #ECA72C;
  --color-purple: #44355B;
  --color-pink: #FF4D80; /* Sasquatch Socks */
  --color-orange: #EE5622;
  --color-bright-yellow: #EAF27C;
}
* {
  font-family: 'Fira Code';
  font-size: 1.2em;
  background: var(--color-grey);
  color: var(--color-white);
}

h1,h2,h3,h4,h5,h6 {
  text-align: center;
}
h1 span {
  font-size: 1em;
  color: var(--color-yellow);
}
.hr {
  margin: 20px 0;
  border: dashed 5px var(--color-orange);
}
.input {
  text-align: center;
}
.input input {
  font-size: 1em;
  outline: none;
  border: none;
  background: var(--color-black);
  color: var(--color-green);
  padding: 5px;
}
</style>
-->
