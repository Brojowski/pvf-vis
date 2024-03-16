<script>
import { VuePlotly } from 'vue3-plotly'

export default {
  components: {
    VuePlotly
  },
  props: ['match'],
  data() {
    return {
      max: 40,
      sections: [2, 5, 10, 15],
      sets: this.match['fullScoutData']['scout']['sets']
    }
  },
  methods: {
    setScore(set) {
      let lastPt = set.events[set.events.length - 1]
      let pointMax = Math.max(25, lastPt.score.home, lastPt.score.away) + 2
      return {
        data: [
          {
            x: [0, pointMax],
            y: [0, pointMax],
            type: 'scatter',
            line: {color: 'rgba(229,229,229, 0.8)'},
          },
          { // Home win
            x: [pointMax, 25, 25, pointMax],
            y: [0, 0, 23, pointMax - 2],
            type: 'scatter',
            line: {color: this.match.teams.home.color},
            fill: 'toself',
          },
          { // Away Win
            x: [0, 0, 23, pointMax - 2],
            y: [pointMax, 25, 25, pointMax],
            type: 'scatter',
            line: {color: this.match.teams.away.color},
            fill: 'toself',

          },
          {
            x: set.events.map(it => it.score.home),
            y: set.events.map(it => it.score.away),
            type: "scatter",
            line: {color: "black"},
          },
        ],
        layout: {
          title: "Set Scoring",
          width: 500,
          height: 500,
          xaxis: {
            range: [0, pointMax],
            dtick: 5,
            title: this.match.teams.home.name,
          },
          yaxis: {
            range: [0, pointMax],
            dtick: 5,
            title: this.match.teams.away.name,
          }
        }
      }
    }
  }
}
</script>

<template>
  <VuePlotly class="set-score" v-for="set in sets" :data="setScore(set)" :layout="{title: 'Set #'}" :displayModeBar="true"/>
</template>

<style scoped>
</style>
