<template>
    <div class="hello">
        <h2>Users</h2>      
        <input type="text" v-model="user.name" placeholder="Name">
        <input type="text" v-model="user.age" placeholder="Age">
        <input type="text" v-model="user.status" placeholder="status">
        <input type="text" v-model="user.created_at" placeholder="created_at">
        <button @click="add_user()">Add User</button>
        <hr>  
        <ul>
            <li style="display:block;" v-for="(user, ind) in users" :key="ind" :class="{active:user.status}">
                Name: {{ user.name }}, Age: {{ user.age }} <button @click="delete_user(ind)">Delete User</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Users',
    data () {
        return {
            user: {
                name: '',
                age: '',
                status: 0,
                created_at: Date.now()
            }   
        }
    },
    methods: {
        add_user () {
            this.user.status = +this.user.status;
            this.$store.dispatch('ADD_USER', this.user);
            this.user = {
                name: '',
                age: '',
                status: 0,
                created_at: Date.now()
            }
        },
        delete_user (index) {
            console.log('this.store', this.$store)
            this.$store.dispatch('DELETE_USER', index);
        }
    },
    computed: {
        users: function () { return this.$store.getters.users; }
    }
} 
</script>
