<template>
  <div class="upload-page">
    <UploadForm class="with-files" />

    <div class="form without-files">
      <div class="mb-3">
        <p class="text-lg bold mb-1">Upload without files</p>
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
        <input v-model="video" v-on:keyup.enter="addVideo" type="text" placeholder="Aflevering 1.mp4" class="input-group__input">
      </div>

      <div v-if="videos" class="mt-1">
        <p v-for="(video, index) in videos" :key="index" class="mb-1">{{ video }}</p>
      </div>

      <Button @submit="submit" :loadingState="isLoading">Upload</Button>
    </div>
  </div>
</template>

<script>
import UploadForm from "@/components/UploadForm";
import Button from "../components/Button";
export default {
  name: "Upload",
  components: {Button, UploadForm},
  data() {
    return {
      isLoading: false,
      videoForm: true,
      name: null,
      video: null,
      videos: []
    }
  },
  methods: {
    addVideo(e) {
      console.log(e)
      this.videos.push(this.video)
      this.video = null
    },
    uploadImage(e) {
      this.image = e.target.files[0]
    },
    submit() {
      console.log({
        name: this.name,
        image: this.image,
        videos: this.videos
      })
    }
  }
}
</script>