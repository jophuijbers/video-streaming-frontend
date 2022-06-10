<template>
  <div class="watch">
    <div class="header">
      <p class="text-lg bold">{{ upload.name }}</p>
      <p class="text-dark">{{ upload.length }}</p>
    </div>

    <video :src="source" controls ref="video-player" class="video-player" />

    <EpisodeList v-if="upload.length > 1" :episodes="upload.videos" @selectEpisode="selectVideo" />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import EpisodeList from "@/components/EpisodeList";
import {FETCH_UPLOAD} from "@/store/actions.type";

export default {
  name: "Watch",
  components: {EpisodeList},
  data() {
    return {
        source: null
    }
  },
  async created() {
    this.isLoading = true
    await this.$store.dispatch(FETCH_UPLOAD, this.$route.query.v)
    this.source = this.upload.videos[0].path
    this.isLoading = false
  },
  methods: {
    selectVideo(video) {
      this.source = video.path
      this.$refs['video-player'].autoplay = true
      window.scrollTo(0,0)
    }
  },
  computed: {
    ...mapGetters(['upload'])
  }
}
</script>
