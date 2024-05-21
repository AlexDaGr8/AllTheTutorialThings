<template>
  <div id="app">
    <h1 v-test>{{ msg }}</h1>
    <h1 v-test>Some Random Text</h1>
    <h1>{{ msg }}</h1>
    <h1>{{ msg | camel }}</h1>
    <transition name="test">
      <h1 v-if="status">{{ msg }}</h1>
    </transition>
    <button @click="status=!status">Test Transition</button>
    <hello/>
    <active/>
    <user-list></user-list>
    <user-list :status=1></user-list>
    <users/>

    <div id="flip-list-demo" class="demo">
      <h1>Flip List Demo</h1>
      <button @click="shuffle">Shuffle</button>
      <transition-group tag="ul" name="flip-list">
        <li v-for="num in numbers" :key="num">{{ num }}</li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Active from './components/Active'
import Users from './components/Users'
import UserList from './components/UserList'
import _ from 'lodash'
export default {
  name: 'App',
  components: { Hello, Active, Users, UserList },
  data () {
    return {
      status: false,
      msg: 'HelloHowAreYouDoing',
      numbers: [1,2,3,4,5,6,7,8,9]
    }
  },
  methods: {
    shuffle: function() {
      this.numbers = _.shuffle(this.numbers);
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 1s;
}
.test-enter-active {
  transition: transform 3s;
  text-shadow: 0px 5px 10px #fdff00;
}
.test-leave-active {
  transition: transform 3s;
  text-shadow: 0px 5px 10px #a1a194;
}
.test-enter, .test-leave-to {
  transform: translateX(90%);
}
.test-enter-to, .test-leave {
  transform: translateX(-15%);
}
.active {
  color: mediumseagreen;
}
</style>
