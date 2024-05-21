<template>
  <div id="example2">
      <h2>{{ text1 }}</h2>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'Example2',
  computed: {
    ...mapFields([
      "text1",
      "text2"
    ])
  }
}
</script>
