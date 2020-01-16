<template>
  <div class="container">
    <h1>To Do List</h1>

    <router-link to="/agregar">
      <button class="btn btn-success mt-2">Agregar</button>
    </router-link>
  <h3 class="my-4">Welcome: {{usuario.email}}</h3>
    <div v-if="carga" class="my-5">
      <div class="row justify-content-center">
        <h3>Getting Data..</h3>
      </div>
      <div class="row justify-content-center mt-3">
        <dot-loader :loading="carga"></dot-loader>
      </div>
    </div>

    <ul class="list-group mt-3" v-if="!carga">
      <li
        v-for="(item, index) of tareas"
        :key="item.id"
        class="list-group-item"
      >
        <div class="float-left pb-4">{{ index + 1 }} - {{ item.nombre }}</div>
        <div class="float-right">
          <router-link :to="{ name: 'editar', params: { id: item.id } }">
            <button class="btn btn-warning btn-sm mr-3">Editar</button>
          </router-link>
          <button @click="eliminarTarea(item.id)" class="btn btn-danger btn-sm">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DotLoader from "vue-spinner/src/DotLoader.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "home",
  components: {
    DotLoader
  },
  computed: {
    ...mapState(["usuario", "tareas", "carga"])
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea"])
  },
  created() {
    this.getTareas();
  }
};
</script>
