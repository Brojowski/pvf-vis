<script>
import {VuePlotly} from 'vue3-plotly'
import play_key from "@/play_key.js";

export default {
  components: {
    VuePlotly
  },
  props: ['touches'],
  computed: {
    playerActions() {
      return this.playerContributions(0, play_key.team.AWAY, "30")
    }
  },
  data() {
    return {
    }
  },
  methods: {
    playerContributions(setNum, playerTeam, playerNumber) {
      return this.touches.filter(it => it.setRef === setNum
          && it.team === playerTeam
          && it.player === playerNumber)
    },
    playerEfficiency() {
      console.log(this.playerActions)
      return {
        data: [
          {
            x: [1, 2, 3, 4],
            y: [6, 3, 5, 1],
            type: "bar",
            offsetgroup: 0,
            marker: {color: 'grey'},
          },
          {
            x: [1, 2, 3, 4],
            y: [4, 5, 6, 3],
            type: "bar",
            offsetgroup: 0,
            marker: {color: 'rgba(120, 0, 0, .8)'},
          },
          {
            x: [1, 2, 3, 4],
            y: [3, 2, 1, 5],
            type: "bar",
            offsetgroup: 0,
            marker: {color: 'rgba(0, 120, 0, .8)'},
          },
        ],
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
        }
      }
    }
  }
}
</script>

<template>
  <VuePlotly :data="playerEfficiency()" :displayModeBar="true"/>
</template>

<style scoped>

</style>