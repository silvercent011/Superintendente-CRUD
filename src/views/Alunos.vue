<template>
  <div>
    <div>
      <b-navbar fixed toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>
      </b-navbar>
    </div>
    <b-tabs
      active-nav-item-class="font-weight-bold text-uppercase"
      content-class="mt-3"
      fill
    >
      <b-tab title="Alunos" active>
        <div v-if="loading">
          <div class="p-2" v-for="item in 20" :key="item.id">
            <CardAlunoLoading />
          </div>
        </div>
        <div class="p-2" v-for="item in alunos" :key="item.id">
          <CardAluno :dados="item" />
        </div>
      </b-tab>
      <b-tab title="Sets"><p>I'm the second tab</p></b-tab>
      <b-tab title="Alunos Desativados"><p>I'm the second tab</p></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import firebase from "firebase";
import CardAlunoLoading from "../components/CardAlunoLoading";
import CardAluno from "../components/CardAluno";
export default {
  name: "Alunos",
  components: {
    CardAlunoLoading,
    CardAluno,
  },
  data: function () {
    return {
      alunos: [],
      loading: true,
    };
  },
  methods: {
    getData(collection) {
      firebase
        .database()
        .ref(`/${collection}/data`)
        .once("value")
        .then((snapshot) => {
          let dados = snapshot.val();
          this.alunos = dados;
          console.log(this.alunos);
          this.loading = false;
        });
    },
  },
  mounted: function () {
    this.getData("alunos");
  },
};
</script>

<style scoped>
</style>
