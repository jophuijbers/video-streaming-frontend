<template>
  <div class="form">
    <div class="mb-3">
      <p class="text-lg bold mb-1">Upload with files</p>
    </div>

    <div class="input-group">
      <p class="input-group__label">Name*</p>
      <input v-model="name" type="text" placeholder="Willems kantine..." class="input-group__input">
    </div>

    <div class="input-group">
      <p class="input-group__label">Banner image</p>
      <input @change="uploadImage" type="file" accept="image/*" class="input-group__input">
    </div>

    <div class="input-group">
      <p class="input-group__label">Video(s)*</p>
      <input @change="uploadVideo" multiple type="file" accept="video/mp4" class="input-group__input">
    </div>

    <div v-if="videos" class="mt-1">
      <p v-for="(video, index) in videos" :key="index" class="mb-1">{{ video.name }}</p>
    </div>

    <Button @submit="submit" :loadingState="isLoading">Upload</Button>
  </div>
</template>

<script>
import {UPLOAD_COLLECTION, UPLOAD_VIDEO} from "@/store/actions.type";
import Button from "@/components/Button";

export default {
  name: "UploadForm",
  components: {Button},
  data() {
    return {
      isLoading: false,
      name: null,
      video: null,
      videos: [],
      image: null
    }
  },
  methods: {
    uploadVideo(e) {
      if (e.target.files.length > 1) {
        this.videos = [...e.target.files]
        return
      }
      this.video = e.target.files[0]
    },
    uploadImage(e) {
      this.image = e.target.files[0]
    },
    async submit() {
      if (!this.name && (!this.video || !this.videos)) {
        return
      }

      this.isLoading = true
      if (this.video) {
        await this.saveVideo()
      } else if (this.videos) {
        await this.saveCollection()
      }
      this.isLoading = false
    },
    async saveVideo() {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('video', this.video)
      formData.append('image', this.image)

      await this.$store.dispatch(UPLOAD_VIDEO, formData).then((video) => {
        this.$router.push({name: 'watch', query: {v: video.id}})
      })
    },
    async saveCollection() {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('image', this.image)
      this.videos.forEach(video => {
        formData.append('videos', video)
      })

      await this.$store.dispatch(UPLOAD_COLLECTION, formData).then((collection) => {
        this.$router.push({name: 'watch', query: {c: collection.id}})
      })
    }
  }
}
</script>

<style scoped>

</style>