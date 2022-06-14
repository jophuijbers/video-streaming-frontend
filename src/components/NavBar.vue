<template>
  <div class="nav-bar">
    <div class="nav-bar__content">
      <div class="nav-bar__main">
        <router-link :to="{ name: 'home' }">
          <img src="logo.png" alt="">
          <span class="text-xl bold">enseHub</span>
        </router-link>
      </div>
      <img ref="hamburger" src="icons/bars-solid.svg" class="hamburger" alt="">
      <div class="nav-bar__items">
        <div v-if="user.isAdmin" class="nav-bar__items__link">
          <router-link :to="{ name: 'upload' }">Upload</router-link>
        </div>
        <div v-if="user.isAdmin" class="nav-bar__items__link">
          <router-link :to="{ name: 'admin' }">Admin</router-link>
        </div>
        <div class="nav-bar__items__link">
          <a @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {LOGOUT} from "@/store/actions.type";
import {mapGetters} from "vuex";

export default {
  name: "NavBar",
  mounted() {
    this.$refs['hamburger'].onclick = function() {
      const items = document.getElementsByClassName('nav-bar__items')[0]
      if (!items.style.display || items.style.display === 'none') {
        items.classList.add('dropdown')
        items.style.display = 'block'
      } else {
        items.classList.remove('dropdown')
        items.style.display = 'none'
      }
      const dropdown = document.getElementsByClassName('dropdown')[0]
      dropdown.onclick = function() {
        dropdown.style.display = 'none'
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT)
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>