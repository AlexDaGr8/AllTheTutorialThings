<template>
    <div>
        <h4>{{ text1 }}</h4>
        <h4>{{ text2 }}</h4>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
    computed: {
        ...mapFields([
            "text1",
            "text2"
        ])
    }
}
</script>


<style>
h4 {
    font-family: 'flottflott';
    color: var(--color-blue);
}
</style>

