import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    database: []
  },
  mutations: {
  },
  actions: {
    getData() {
      firebase.database().ref(`/`).once("value").then(async (snapshot) => {
          let dados = await snapshot.val();
          if (dados != null) {
            this.state.database = dados
          }
          console.log(this.state.database)
        });
    }
  },
  modules: {
  }
})
