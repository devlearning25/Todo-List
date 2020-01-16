<template> 
  <div class="container mt-3 justify-content-center">
    <h1>Add To Do</h1>

    <form @submit.prevent="agregarTarea(nombre)" class="form-inline mt-3">
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Nombre</div>
        </div>
        <input type="text" class="form-control" v-model="nombre" />
      </div>
      <button type="submit" class="btn btn-primary mb-2">Add</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "agregar",
  data() {
    return {
      nombre: ""
    };
  },
  methods: {
    ...mapActions(["agregarTarea"])
  }
};
</script>
