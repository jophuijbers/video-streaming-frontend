<template>
  <div>
    <div v-if="!isLoading" class="watch">

      <VideoPlayer :video-path="current.path" :autoplay="autoplay" @next="selectNext" />

      <div class="info">
        <div class="row">
          <div class="title-wrapper">
            <span class="title text-lg bold">{{ current.name }}</span>
            <div v-if="user.isAdmin" class="edit">
              <img @click="editVideo" src="icons/pen.svg" alt="">
              <img @click="deleteVideo" src="icons/trash-can.svg" alt="">
            </div>
          </div>

          <VideoButtons v-if="upload.length > 1" @prev="selectPrev" @next="selectNext" hide="" />
        </div>

        <p class="text-md text-dark">Duration: {{ current.duration }}</p>

        <div class="row">
          <p class="text-md text-dark">
            <span>Genres: </span>
            <span v-for="(tag, index) in upload.tags" :key="index">{{ tag }}{{ index === upload.tags.length-1 ? '' : ', ' }}</span>
          </p>
        </div>
      </div>

      <table v-if="upload.length > 1" class="videos mt-1">
        <tr>
          <th class="grow text-lg">{{ upload.name }}</th>
          <th class="text-dark">{{ upload.videos.length }}ep</th>
        </tr>
        <tr v-for="(video, index) in upload.videos" :key="index" @click="selectVideo(video)">
          <td class="hover" :class="{ 'selected': video.id === current.id }">
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
import {mapGetters} from "vuex";
import {FETCH_UPLOAD} from "@/store/actions.type";
import {DELETE_UPLOAD} from "../store/actions.type";
import VideoButtons from "../components/VideoButtons";
import VideoPlayer from "../components/VideoPlayer";

export default {
  name: "Watch",
  components: {VideoPlayer, VideoButtons},
  data() {
    return {
      isLoading: false,
      current: null
    }
  },
  async created() {
    this.isLoading = true
    await this.$store.dispatch(FETCH_UPLOAD, this.$route.query.v)
    this.current = this.upload.videos[0]
    this.isLoading = false
  },
  methods: {
    selectVideo(video) {
      this.current = video
      window.scrollTo(0,0)
    },
    selectPrev() {
      const prevIndex = this.currentIndex - 1
      if (prevIndex < 0) return
      const prev = this.upload.videos[prevIndex]
      this.selectVideo(prev)
    },
    selectNext() {
      const nextIndex = this.currentIndex + 1
      if (nextIndex === this.upload.length) return
      const prev = this.upload.videos[nextIndex]
      this.selectVideo(prev)
    },
    deleteVideo() {
      const text = `Are you sure you want to delete ${this.upload.name}`
      if (confirm(text)) {
        this.$store.dispatch(DELETE_UPLOAD, this.upload.id).then(() => {
          this.$router.push({ name: 'home' })
        })
      }
    },
    editVideo() {
      this.$router.push({name:'edit', params: {id: this.upload.id}})
    }
  },
  computed: {
    ...mapGetters(['upload', 'user']),
    currentIndex() {
      return this.upload.videos.indexOf(this.current)
    },
    autoplay() {
      return this.upload.length > 1 && (this.currentIndex + 1) < this.upload.length
    }
  }
}
</script>
