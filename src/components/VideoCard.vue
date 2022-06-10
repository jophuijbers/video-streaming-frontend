<template>
  <div class="video-card">
    <p class="video-card__title text-md bold">{{ item.name }}</p>
    <img :src="item.imagePath" alt="" class="video-card__image">
    <div class="video-card__info">
      <p class="text-sm">{{ item.creator.username }}</p>
      <span class="text-sm">{{ item.duration || item.length + ' episodes' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoCard",
  props: ['item']
}
</script>

<style scoped>

</style>