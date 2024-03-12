<script>
import SetScore from './components/SetScore.vue'
import {data} from './socket_event_ex.js'
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
      sets: data['widget/play-by-play updated']['fullScoutData']['scout']['sets']
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
      this.sets = data['fullScoutData']['scout']['sets']
    },
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
