export const firstMixin = {
    methods: {
        get_active_or_inactive() {
            var status = this.status;
            return this.users.filter(user => user.status === status);
        },
        filter_by_date (users) {
            return users.sort((a,b) => a.created_at > b.created_at);
        }
    }
}