<template>
    <div>
        <h2>{{ title }} <input v-model="query"></h2>
            <transition-group 
                name="user" 
                tag="ul"
                v-bind:css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                >
                <li 
                    v-for="(user, ind) in users" 
                    :key="ind" 
                    :data-index="ind"
                    :class="{active:user.status}" 
                    class="list-item">
                    <p>Name: {{user.name}}, Age: {{user.age}}</p>
                </li>
            </transition-group>
    </div>
</template>

<script>
import { firstMixin } from "../mixins";
import _ from 'lodash'
import Velocity from 'velocity-animate'
export default {
    name: 'Active',
    mixins: [ firstMixin ],
    props: {
        status: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            query: ''
        }
    },
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        enter: function (el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function() {
                Velocity(
                    el,
                    { opacity: 1, height: '1.6em' },
                    { complete: done }
                )
            }, delay)
        },
        leave: function (el, done) {
            var delay = el.dataset.index * 150;
            setTimeout(function () {
                Velocity(
                el,
                { opacity: 0, height: 0 },
                { complete: done }
                )
            }, delay)
        }
    },
    computed: {
        title: function () {
            return this.status > 0 ? 'Active User' : 'Inactive Users'
        },
        users:function () {    
            return this.filter_by_date(
                this.$store.getters.users
                    .filter(d => d.status === this.status && d.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1)
                ); 
        }
    }
}
</script>

<style>
/* .user-enter-active {
  animation: bounce-in .5s;
}
.user-leave-active {
    animation: bounce-in .5s reverse;
} */
/* .list-item {
  transition: all 1s;
} */
/* .user-enter, .user-leave-to {  
    opacity: 0;
    transform: translateX(30px);
} 
.user-enter-to, .user-leave {
  transform: translateX(0px);
  opacity: 1;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
} */
</style>

