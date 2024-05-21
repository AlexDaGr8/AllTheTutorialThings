import Router from 'vue-router'
import Vue from 'vue'

import Home from '@/components/Home'
import Example1 from '@/example1/Example1'
import Example2 from '@/example2/Example2'

Vue.use(Router);

export default new Router({
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        {
            path: '/example1',
            component: Example1,
            name: 'example1'
        },
        {
            path: '/example2',
            component: Example2,
            name: 'example2'
        }
    ]
})
