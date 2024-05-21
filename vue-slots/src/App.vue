<template>
  <div id="app">
    <nav>
      <router-link :to="{name: 'home'}">Home</router-link>
      <router-link :to="{name: 'slots'}">Slots</router-link>
    </nav>
    <h1>Welcome to Your Vue.js + TypeScript App</h1>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
/* RGB */
$yellow: rgba(255, 252, 49, 1);
$purple: rgba(92, 65, 93, 1);
$red: rgba(255, 75, 62, 1);
$white: rgba(246, 247, 235, 1);
$black: rgba(57, 62, 65, 1);

:root {
  --yellow: rgba(255, 252, 49, 1);
  --purple: rgba(92, 65, 93, 1);
  --red: rgba(255, 75, 62, 1);
  --white: rgba(246, 247, 235, 1);
  --black: rgba(57, 62, 65, 1);
  --black-less: rgba(96, 104, 109, 1);;
}

body {
  text-align: center;
  background: var(--black);
  color: var(--white);
  font-family: "Liu Jian Mao Cao";
}
</style>