<script>
import { VuePlotly } from 'vue3-plotly'

export default {
  components: {
    VuePlotly
  },
  props: ['rallies'],
  data() {
    console.log(this.rallies)
    return
  },
}
</script>

<template>
  <VuePlotly :data="data" :layout="layout" :displayModeBar="true"/>
</template>

<style scoped>
</style>
