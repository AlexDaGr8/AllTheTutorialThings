import { getField, updateField } from "vuex-map-fields";

export default {
    state: {
        text4: "",
        text5: ""
    },
    getters: {
        getComp2Field(state) {
            return getField(state);
        }
    },
    mutations: {
        updateComp2Field(state, field) {
            return updateField(state, field);
        }
    },
    actions: {
        
    }
}