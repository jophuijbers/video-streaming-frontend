<template>
  <Player @vmPlaybackReady="ready" @vmPlaybackEnded="videoEnded" :class="{'ended': ended}" ref="player" class="player">
    <Video>
      <source :data-src="videoPath" type="video/mp4" />
    </Video>

    <DefaultUi />

    <div v-if="ended" class="auto-play">
      <p class="mb-1">Next episode in:</p>
      <span class="text-lg">{{ countdown }}</span>
      <p @click="ended = false" class="cancel mt-1">Cancel</p>
    </div>
  </Player>
</template>

<script>
import { Player, Video, DefaultUi } from '@vime/vue';

export default {
  name: "VideoPlayer",
  props: ['videoPath', 'autoplay'],
  components: {Player, Video, DefaultUi},
  data() {
    return {
      countdown: 5,
      ended: false
    }
  },
  computed: {
    player() {
      return this.$refs.player
    }
  },
  methods: {
    async ready() {
      await this.player.play()
    },
    async videoEnded() {
      // this.$emit('next')
      //
      // if (!this.autoplay) return
      // this.ended = true
      // for (let i = 0; i < 5; i++) {
      //   await new Promise(r => setTimeout(r, 1000))
      //   this.countdown--
      // }
      // this.countdown = 5
      // if (this.ended) {
      //   this.ended = false
      //   this.$emit('next')
      // }
    }
  }
}
</script>

<style scoped>

</style>