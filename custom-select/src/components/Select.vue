<template>
    <div>
        <input type="text" v-bind="input">
        <div class="open" :class="{ up: open }"></div>
        <ul>
            <li v-for="option in options" :key="option">{{ option }}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        options: Object,
    },
    data () {
        return {
            input: '',
            open: false,
        }
    }
}
</script>

<style lang="sass" scoped>
.open
    &.up
        &:before
            content: '^'
    &:before
        content: '^'
</style>
