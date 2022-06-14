<template>
  <div class="home-page">
    <input v-model="searchValue" placeholder="Movie title..." class="search-bar" type="text">
    <div v-if="!isLoading">

      <VideoCarrousel v-if="!searchValue" title="Recently added" tag="recent" />

      <VideoCarrousel v-if="!searchValue" title="Nederlandse klassiekers" tag="Nederlands" />

      <VideoCarrousel v-if="!searchValue" title="War movies/series" tag="War" />

      <VideoCarrousel v-if="!searchValue" title="Cartoons" tag="Cartoon" />

      <div>
        <div class="mb-2">
          <span class="text-lg bold">All movies</span>
          <span class="text-dark ml-1">{{ uploads.length }}</span>
        </div>
        <div class="video-grid">
          <VideoCard
              v-for="upload in uploads" :key="upload.id"
              @click.native="goToVideoPage(upload)"
              :item="upload"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import VideoCard from "@/components/VideoCard";
import {FETCH_UPLOADS} from "@/store/actions.type";
import VideoCarrousel from "../components/VideoCarousel";

export default {
  name: "Home",
  components: {VideoCarrousel, VideoCard},
  data() {
    return {
      isLoading: false,
      searchValue: null
    }
  },
  async created() {
    this.isLoading = true
    await this.$store.dispatch(FETCH_UPLOADS, {})
    this.isLoading = false
  },
  methods: {
    goToVideoPage(video) {
      this.$router.push({name: 'watch', query: {v: video.id}})
    }
  },
  computed: {
    ...mapGetters(['uploads'])
  },
  watch: {
    async searchValue() {
      await this.$store.dispatch(FETCH_UPLOADS, this.searchValue)
    }
  }
}
</script>