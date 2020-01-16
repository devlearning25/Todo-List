<template>
  <div>
    <h1 class="mb-4">Register Free!</h1>
    <b-row class="justify-content-center">
      <b-form
        @submit.prevent="crearUsuario({ email: email, password: password })"
      >
        <b-form-input type="email" placeholder="Email" v-model="email" /><br />
        <b-form-input
          type="password"
          placeholder="Password"
          v-model="password"
        /><br />
        <b-form-input
          type="password"
          placeholder="Repeat Password"
          v-model="rePassword"
        /><br />
        <button type="submit" :disabled="!desactivar">Crear Usuario</button>
      </b-form>
    </b-row>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      rePassword: ""
    };
  },
  methods: {
    ...mapActions(["crearUsuario"])
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      return this.password === this.rePassword && this.password != "";
    }
  }
};
</script>
