<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <mySelect :options="options"></mySelect>
  </div>
</template>

<script>
import Select from './components/Select'

export default {
  components: { 'mySelect': Select },
  data () {
    return {
      options: [
        'test1', 'test2', 'test3', 'test4'
      ]
    }
  }
}
</script>

<style lang="sass">
#app 
  width: 90%
  margin: 5px auto
  text-align: center
</style>


