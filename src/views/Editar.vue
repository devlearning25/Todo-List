<template>
  <div>
    <h1>EDITAR</h1>
    {{ id }}
    <form @submit.prevent="editarTarea(tarea)" class="form-inline mt-2">
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Nombre</div>
        </div>
        <input type="text" v-model="tarea.nombre" class="form-control mr-2" />
      </div>
      <button type="submit" class="btn btn-warning">Editar</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["getTarea", "editarTarea"])
  },
  data() {
    return {
      id: this.$route.params.id
    };
  },
  created() {
    this.getTarea(this.id);
  },
  computed: {
    ...mapState(["tarea"])
  }
};
</script>
