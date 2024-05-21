import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Comp1 from "./comp1"
import Comp2 from "./comp2"

export default new Vuex.Store({
    modules: {
        a: Comp1,
        b: Comp2
    }
})