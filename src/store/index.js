import Vue from "vue";
import Vuex from "vuex";
var firebase = require("firebase/app");
import router from "../router/index";
import db from "../main";
import { setTimeout } from "core-js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: "",
    error: "",
    tareas: [],
    tarea: { nombre: "", id: "" },
    carga: false
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setTareas(state, tareas) {
      state.tareas = tareas;
    },
    setTarea(state, tarea) {
      state.tarea = tarea;
    },
    eliminarTarea(state, id) {
      state.tareas = state.tareas.filter(doc => {
        return doc.id != id;
      });
    },
    cargarFirebase(state, payload) {
      state.carga = payload;
    }
  },
  actions: {
    crearUsuario({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit("setUsuario", { email: res.user.email, uid: res.user.uid });
          db.collection(res.user.email)
            .add({
              nombre: "Tarea de ejemplo"
            })
            .then(() => {
              router.push({ name: "home" });
            });
        })
        .catch(err => {
          console.log(err.message);
          commit("setError", err.message);
        });
    },
    loginUser({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit("setUsuario", { email: res.user.email, uid: res.user.uid });
          router.push({ name: "home" });
        })
        .catch(err => {
          console.log(err);
          commit("setError", err.message);
        });
    },
    detectUser({ commit }, payload) {
      if (payload != null) {
        commit("setUsuario", { email: payload.email, udi: payload.uid });
      } else {
        commit("setUsuario", null);
      }
    },
    logout({ commit }, payload) {
      firebase.auth().signOut();
      commit("setUsuario", null);
      router.push({ name: "login" });
    },
    getTareas({ commit }) {
      commit("cargarFirebase", true);

      const user = firebase.auth().currentUser;
      const tareas = [];
      db.collection(user.email)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
          });
          setTimeout(() => {
            commit("cargarFirebase", false);
          }, 1000);
        });
      commit("setTareas", tareas);
    },
    getTarea({ commit }, id) {
      const user = firebase.auth().currentUser;
      db.collection(user.email)
        .doc(id)
        .get()
        .then(doc => {
          let tarea = doc.data();
          tarea.id = doc.id;
          commit("setTarea", tarea);
        });
    },
    editarTarea({ commit }, tarea) {
      const user = firebase.auth().currentUser;
      if (confirm('Want to save changes?')) {
        db.collection(user.email)
        .doc(tarea.id)
        .update({
          nombre: tarea.nombre
        })
        .then(() => {
          router.push({ name: "home" });
        });
      }else{
        router.push({ name: "home" });
      }
    },
    agregarTarea({ commit }, nombre) {
      const user = firebase.auth().currentUser;
      if (nombre != "") {
        db.collection(user.email)
          .add({
            nombre: nombre
          })
          .then(doc => {
            router.push({ name: "home" });
          });
      } else {
        alert("Can't Add a blank To Do");
      }
    },
    eliminarTarea({ commit }, id) {
      const user = firebase.auth().currentUser;
      if (confirm("Are you sure?")) {
        db.collection(user.email)
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
            commit("eliminarTarea", id);
          });
      }
    }
  },
  getters: {
    userExist(state) {
      if (
        state.usuario === null ||
        state.usuario === "" ||
        state.usuario === undefined
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  modules: {}
});
