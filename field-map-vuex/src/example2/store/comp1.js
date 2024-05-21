import { getField, updateField } from "vuex-map-fields";

export default {
    state: {
        text1: "Text 1",
        text2: "Text 2",
    },
    getters: {
        getComponent1(state) {
            return getField(state);
        }
    },
    mutations: {
        updateComponent1(state, field) {
            return updateField(state,field);
        }
    },
    actions: {
        
    }
}