import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

import App from "./App.vue";
import router from "./router";
import store from "./store";

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCREiVmozw7g-HkfDhS-oU8GMBWtoJ-FAs",
  authDomain: "auth-46b35.firebaseapp.com",
  databaseURL: "https://auth-46b35.firebaseio.com",
  projectId: "auth-46b35",
  storageBucket: "auth-46b35.appspot.com",
  messagingSenderId: "110334439025",
  appId: "1:110334439025:web:724474ffb13325d0cf35d0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("detectUser", { email: user.email, uid: user.uid });
  } else {
    store.dispatch("detectUser", null);
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
