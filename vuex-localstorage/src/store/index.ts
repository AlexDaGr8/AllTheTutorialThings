import Vue from 'vue'
import Vuex from 'vuex'
const version = require('../../package.json').version;

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        version: '',
        count: 1
    },
    mutations: {
        initaliseStore(state) {
            // Check if the ID exists
            if (localStorage.getItem('store')) {
                let store = JSON.parse(localStorage.getItem('store'));
                
                // Check the version stored against current. 
                // if different, don't load cached version
                if (store.version == version) {
                    this.replaceState(
                        Object.assign(state, store)
                    );
                } else {
                    state.version = version;
                }
            }
        }
    },
    actions: {
        
    },
    getters: {
        
    }
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
    // Store the state object as JSON string
    localStorage.setItem('store', JSON.stringify(state));
})