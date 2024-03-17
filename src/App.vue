<script>
import {prerecordedMatch} from './socket_event_ex.js'
import util from './util.js'
import {VuePlotly} from 'vue3-plotly'
import SetScore from "@/components/SetScore.vue";
import PlayerEfficiency from "@/components/PlayerEfficiency.vue";

export default {
  computed: {
    touches() {
      return util.touches(this.match)
    },
  },
  components: {
    PlayerEfficiency,
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
      liveMatchId: '2125305',
      match: prerecordedMatch,
    }
  },
  methods: {
    startSocket() {
      console.log('start socket:', this.liveMatchId)
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
              connectionPathName: '/play-by-play/' + this.liveMatchId,
              token: 'PhodQuahof1ShmunWoifdedgasvuipki'
            }
          }
      );
      socket.on("widget/play-by-play updated", this.updatePlayByPlay);
    },
    updatePlayByPlay(data) {
      console.log("widget/play-by-play updated", data)
      this.match = data
      this.sets = data['fullScoutData']['scout']['sets']
    },
  }
}
</script>

<template>
  <input :value="this.liveMatchId" @change="startSocket()"/>
  <div class="match">
    <SetScore :match="match" class="set-score"/>
    <PlayerEfficiency :touches="touches" />
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
