<template>
  <div class="login-page">
    <div class="form">
      <p class="text-lg bold">Log in</p>

      <div class="input-group">
        <p class="input-group__label">Username</p>
        <input v-model="username" type="text" placeholder="user1" class="input-group__input">
      </div>

      <div class="input-group">
        <p class="input-group__label">Password</p>
        <input v-model="password" type="password" placeholder="password1" class="input-group__input">
      </div>

      <Button @submit="submit" :loading-state="isLoading">Login</Button>
    </div>
  </div>
</template>

<script>
import {LOGIN} from "@/store/actions.type";
import Button from "@/components/Button";

export default {
  name: "Login",
  components: {Button},
  data() {
    return {
      isLoading: false,
      username: null,
      password: null
    }
  },
  methods: {
    async submit() {
      this.isLoading = true
      await this.$store.dispatch(LOGIN, {
        username: this.username,
        password: this.password
      }).then(() => {
        this.$router.push({ name: 'home'})
      })
      this.isLoading = true
    }
  }
}
</script>

<style scoped>

</style>