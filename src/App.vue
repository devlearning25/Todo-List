<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }" v-if="userExist" class="mx-2">Home</router-link>
      <router-link :to="{ name: 'register'}" v-if="!userExist" class="mx-2">Register</router-link> 
      <router-link :to="{ name: 'login' }" v-if="!userExist" class="mx-2">Login</router-link> 
      <a @click="logout" v-if="userExist" class="mx-2">Logout</a>
    </div>
    <router-view />
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'App',
  methods: {
    ...mapActions(['logout'])
  },
  computed: {
    ...mapGetters(['userExist'])
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
