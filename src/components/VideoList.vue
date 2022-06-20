<template>
  <div class="video-list mt-3">
    <div class="header">
      <span class="text-lg bold">{{ title }}</span>
      <span class="text-dark">{{ videos.length }}ep</span>
    </div>
    <div
      v-for="(video, index) in videos"
      :key="index"
      @click="selectVideo(video)"
      class="video-list__item"
      :class="{
        active: index === 0,
        striped: index % 2 !== 0,
      }"
    >
      <span class="video-list__item__count">{{ index + 1 + ")" }}</span>
      <span class="video-list__item__link">{{ video.name }}</span>
      <span class="video-list__item__time">{{ video.duration }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoList",
  props: ["title", "videos"],
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    selectVideo(video) {
      this.$emit("selected", video);
    },
  },
};
</script>

<style scoped></style>
