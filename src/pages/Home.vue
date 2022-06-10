<template>
  <div v-if="!isLoading" class="home-page">
    <input v-model="searchValue" class="search-bar" type="text">
    <div class="home-page__grid">
      <VideoCard
          v-for="upload in uploads" :key="upload.id"
          @click.native="goToVideoPage(upload)"
          :item="upload"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import VideoCard from "@/components/VideoCard";
import {FETCH_UPLOADS} from "@/store/actions.type";

export default {
  name: "Home",
  components: {VideoCard},
  data() {
    return {
      isLoading: false,
      searchValue: null
    }
  },
  async created() {
    this.isLoading = true
    await this.$store.dispatch(FETCH_UPLOADS)
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
  // watch: {
  //   async searchValue() {
  //     await this.$store.dispatch(SEARCH_VIDEOS, this.searchValue)
  //   }
  // }
}
</script>