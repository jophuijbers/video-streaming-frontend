<template>
  <div class="home-page">
    <input v-model="searchValue" placeholder="Movie title..." class="search-bar" type="text" />
    <div class="tagFilter" style="margin-bottom: 20px; display: flex">
      <span>Genres:&nbsp;</span>
      <span class="tags">War,&nbsp;</span>
      <span class="tags">Comedy,&nbsp;</span>
      <span class="tags">Nederlands,&nbsp;</span>
      <span class="tags">Thriller,&nbsp;</span>
      <span class="tags">Horror,&nbsp;</span>
      <span class="tags">Dit is dummy data</span>
    </div>
    <div v-if="!isLoading">
      <VideoCarrousel title="Nederlandse klassiekers" tag="Nederlands" />

      <VideoCarrousel v-if="!searchValue" title="Cartoons" tag="Cartoon" />

      <div>
        <p class="text-lg bold mb-2">All movies</p>
        <div class="video-grid">
          <VideoCard v-for="upload in uploads" :key="upload.id" @click.native="goToVideoPage(upload)" :item="upload" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.tags:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
<script>
import { mapGetters } from "vuex";
import VideoCard from "@/components/VideoCard";
import { FETCH_UPLOADS } from "@/store/actions.type";
import VideoCarrousel from "../components/VideoCarousel";

export default {
  name: "Home",
  components: { VideoCarrousel, VideoCard },
  data() {
    return {
      isLoading: false,
      searchValue: null,
    };
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch(FETCH_UPLOADS, {});
    this.isLoading = false;
  },
  methods: {
    goToVideoPage(video) {
      this.$router.push({ name: "watch", query: { v: video.id } });
    },
  },
  computed: {
    ...mapGetters(["uploads"]),
  },
  watch: {
    async searchValue() {
      await this.$store.dispatch(FETCH_UPLOADS, { search: this.searchValue });
    },
  },
};
</script>
