<script>
import {prerecordedMatch} from './socket_event_ex.js'
import {VuePlotly} from 'vue3-plotly'
import SetScore from "@/components/SetScore.vue";

export default {
  components: {
    SetScore,
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
  }
}
</script>

<template>
  <div class="match">
    <SetScore :match="match" class="set-score"/>
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
