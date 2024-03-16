<script>
import {prerecordedMatch} from './socket_event_ex.js'
import {VuePlotly} from 'vue3-plotly'

export default {
  components: {
    VuePlotly
  },
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.0/socket.io.js");
    plugin.async = true;
    document.head.appendChild(plugin);

    setTimeout(this.startSocket, 1000)
  },
  data() {
    return {
      max: 40,
      sections: [2, 5, 10, 15],
      match: prerecordedMatch,
      sets: prerecordedMatch['fullScoutData']['scout']['sets']
    }
  },
  methods: {
    startSocket() {
      const socket = io(
          'https://api.widgets.volleystation.com:443',
          {
            path: '/socket.io',
            transports: [
              'websocket'
            ],
            reconnection: !0,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 1 / 0,
            query: {
              connectionPathName: '/play-by-play/2125302',
              token: 'PhodQuahof1ShmunWoifdedgasvuipki'
            }
          }
      );
      socket.on("widget/play-by-play updated", this.updatePlayByPlay);
    },
    updatePlayByPlay(data) {
      console.log(data)
      this.match = data
      this.sets = data['fullScoutData']['scout']['sets']
    },
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
  <div class="match">
    <VuePlotly class="set-score" v-for="set in sets" :data="setScore(set)" :layout="{title: 'Set #'}" :displayModeBar="true"/>
  </div>
</template>

<style scoped>
.match {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 10px;
  margin: 10px;
}

.set-score {
  margin: auto;
}

</style>
