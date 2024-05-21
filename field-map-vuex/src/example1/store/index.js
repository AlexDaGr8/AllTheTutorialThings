import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        text1: '',
        text2: ''
    },
    mutations: {
        updateField
    },
    actions: {

    },
    getters: {
        getField
    }
})