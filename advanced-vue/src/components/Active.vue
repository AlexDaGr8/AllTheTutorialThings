<template>
    <div class="active-users">
        <h2>Active Users</h2>
        <ul>
            <li style="display:block;" v-for="(user, ind) in activeUsers" :key="ind">
                Name: {{user.name}}, Age: {{user.age}}
            </li>
        </ul>
    </div>
</template>

<script>
import { firstMixin } from "../mixins";
export default {
    name: 'Active',
    mixins: [ firstMixin ],
    data() {
        return {
            status: 1,
        }
    },
    computed: {
        activeUsers: function () {
            return this.filter_by_date(this.get_active_or_inactive());
        },
        users: function () {
            return this.$store.getters.users;
        }
    }
}
</script>
