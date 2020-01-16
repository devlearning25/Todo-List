<template>
  <div class="container">
    <h1 class="mb-4">Login</h1>
    <b-row class="justify-content-center">
      <b-form @submit.prevent="loginUser({ email: email, password: password })">
        <b-form-input
          type="email"
          placeholder="Email"
          v-model="email"
        /><br />
        <b-form-input
          type="password"
          placeholder="Password"
          v-model="password"
        /><br />

        <b-button type="submit" variant="primary">Login</b-button>
        <p>{{ error }}</p>
      </b-form>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["loginUser"])
  },
  computed: {
    ...mapState(["error"])
  }
};
</script>
