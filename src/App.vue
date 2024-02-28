<script>
import SetScore from './components/SetScore.vue'
import {data} from './socket_event_ex.js'
import {VuePlotly} from 'vue3-plotly'

export default {
  components: {
    VuePlotly
  },
  data() {
    return {
      max: 40,
      sections: [2, 5, 10, 15],
      sets: data['widget/play-by-play updated']['fullScoutData']['scout']['sets']
    }
  },
  methods: {
    setScore(set) {

      return {
        data: [
          {
            x: set.events.map(it => it.score.home),
            y: set.events.map(it => it.score.away),
            type: "scatter",
            line: {color: "black"},
          }],
        layout: {
          title: "Set Scoring",
          width: 500,
          height: 500
        }
      }
    }
  }
}
</script>

<template>
  <div class="match">
    <VuePlotly v-for="set in sets" :data="setScore(set)" :layout="{title: 'Set #'}" :displayModeBar="true"/>

  </div>
</template>

<style scoped>
.match {
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.set-score {
}

</style>
