<template>
  <VuePlotly :data="data" :layout="layout" :displayModeBar="true"/>
  `
</template>

<script>
import {VuePlotly} from 'vue3-plotly';

export default {
  components: {
    VuePlotly,
  },
  props: {
    setData: {
      type: Array,
      required: true,
    },
    playerNumber: {
      type: Number,
      required: true
    },
    playerTeam: {
      type: String,
      required: true
    }
  },
  methods: {
    // sets[].events[].exchange.plays[]
  },
  data() {
    return {
      data: [
        {
          x: [1, 2, 3, 4],
          y: [4, 5, 6, 3],
          type: "bar",
          offsetgroup:0,
        },
        {
          x: [1, 2, 3, 4],
          y: [6, 3, 5, 1],
          type: "bar",
          offsetgroup:0,
        }],
      layout: {
        title: 'Your Graph Title',
        xaxis: {
          title: 'X-axis Label',
        },
        yaxis: {
          title: 'Y-axis Label',
        },
        width: 500,
        height: 500,
      },
      config: {
        responsive: true,
      },
    };
  },
};
</script>

<style scoped>
</style>