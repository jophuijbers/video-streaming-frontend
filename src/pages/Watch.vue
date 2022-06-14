<template>
  <div>
    <div v-if="!isLoading" class="watch">
      <div class="header">
        <p class="text-lg bold">{{ current.name }}</p>
        <p class="text-dark">{{ current.duration }}</p>
      </div>

      <video :src="current.path" controls ref="video-player" class="video-player" />

      <div class="tags-list">
        <span v-for="(tag, index) in upload.tags" :key="index" class="tag">{{ tag }}</span>
        <!--        <span class="tag"><img src="icons/xmark-solid.svg" alt=""></span>-->
      </div>

      <table v-if="upload.length > 1" class="mt-3">
        <tr>
          <th class="grow text-lg">{{ upload.name }}</th>
          <th class="text-dark">{{ upload.videos.length }}ep</th>
        </tr>
        <tr v-for="(video, index) in upload.videos" :key="index" @click="selectVideo(video)">
          <td class="hover">
            <p>{{ video.name }}</p>
          </td>
          <td class="text-dark">
            <p>{{ video.duration }}</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_UPLOAD } from "@/store/actions.type";

export default {
  name: "Watch",
  data() {
    return {
      isLoading: false,
      current: null,
    };
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch(FETCH_UPLOAD, this.$route.query.v);
    this.current = this.upload.videos[0];
    this.isLoading = false;
  },
  methods: {
    selectVideo(video) {
      this.current = video;
      this.$refs["video-player"].autoplay = true;
      window.scrollTo(0, 0);
    },
  },
  computed: {
    ...mapGetters(["upload"]),
  },
};
</script>
