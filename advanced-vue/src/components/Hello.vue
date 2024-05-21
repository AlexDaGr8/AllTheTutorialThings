<template>
    <div class="hello">
        <h4>{{ text1 }}</h4>
        <h5 v-for="(t,i) in test" :key="i"> {{ t.name }}</h5>
        <h2>Inactive Users - test</h2>
        <ul>
            <li style="display:block;" v-for="(user, ind) in inactiveUsers" :key="ind">
                Name: {{user.name}}, Age: {{user.age}}
            </li>
        </ul>
    </div>
</template>

<script>
import { firstMixin } from "../mixins";
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'Hello',
    mixins: [ firstMixin ],
    data() {
        return {
            status: 0,
        }
    },
    computed: {
        inactiveUsers: function() {
            return this.filter_by_date(this.get_active_or_inactive());
        },
        users: function () {
            return this.$store.getters.users;
        },
        // text1: function () {
        //     return this.$store.getters['getField']('text1');
        // },
        text1: function () {
            return this.$store.state.text1;
        },
        test: function () {
            return this.$store.getters.test(1)
        }
    }
}
</script>

