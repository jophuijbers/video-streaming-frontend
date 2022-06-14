<template>
  <div class="upload-page">
    <div class="form without-files">
      <div class="mb-3">
        <p class="text-lg bold mb-1">Upload without files</p>
      </div>
      <div class="input-group">
        <p class="input-group__label">Name*</p>
        <input v-model="name" type="text" placeholder="Willems kantine..." class="input-group__input" />
      </div>

      <div class="input-group">
        <p class="input-group__label">Banner image</p>
        <input @change="uploadImage" type="file" accept="image/*" class="input-group__input" />
      </div>

      <div class="input-group">
        <p class="input-group__label">Tags<span class="text-dark ml-1">(separate by spaces)</span></p>
        <input v-model="tags" type="text" placeholder="Willems kantine..." class="input-group__input" />
      </div>

      <div class="input-group">
        <p class="input-group__label"
          >Video(s)*<span class="text-dark ml-1">(press <i>enter</i> to add)</span></p
        >
        <input v-model="video" v-on:keyup.enter="addVideo" type="text" placeholder="Aflevering 1.mp4" class="input-group__input" />
      </div>

      <div v-if="videos" class="upload-list mt-2">
        <div v-for="(video, index) in videos" :key="index" class="upload-list__item mb-1">
          <span>{{ video }}</span>
          <div @click="removeVideo(video)" class="upload-list__item__action"></div>
        </div>
      </div>

      <Button @submit="submit" :loadingState="isLoading">Upload</Button>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button";
import { UPLOAD } from "../store/actions.type";
export default {
  name: "Upload",
  components: { Button },
  data() {
    return {
      isLoading: false,
      videoForm: true,
      name: null,
      image: null,
      tags: null,
      video: null,
      videos: [],
    };
  },
  methods: {
    addVideo() {
      this.videos.push(this.video);
      this.video = null;
    },
    removeVideo(video) {
      const index = this.videos.indexOf(video);
      this.videos.splice(index, 1);
    },
    uploadImage(e) {
      this.image = e.target.files[0];
    },
    async submit() {
      if (!this.name || this.videos.length === 0) return;
      this.isLoading = true;
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.image);
      formData.append("tags", this.tags.toLowerCase());
      this.videos.forEach((video) => {
        formData.append("videos", video);
      });
      await this.$store.dispatch(UPLOAD, formData).then((video) => {
        this.$router.push({ name: "watch", query: { v: video.id } });
      });
      this.isLoading = false;
    },
  },
};
</script>
