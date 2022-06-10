<template>
  <div class="episode-list mt-3">
    <p class="text-lg bold mb-2 ml-1">Episode List</p>
    <div
        v-for="(episode, index) in episodes" :key="index"
        @click="selectEpisode(episode)"
        class="episode-list__item" :class="{'striped': index % 2 !== 0}"
    >
      <span class="episode-list__item__count">{{ index+1 }})</span>
      <span class="episode-list__item__link">{{ episode.name }}</span>
      <span class="episode-list__item__time">{{ episode.duration }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "EpisodeList",
  props: ['episodes'],
  methods: {
    selectEpisode(episode) {
      this.$emit('selectEpisode', episode)
    }
  },
}
</script>

<style scoped>

</style>