<template>
  <b-card no-body>
    <b-tabs
      card
      active-nav-item-class="font-weight-bold text-uppercase"
      content-class="mt-3"
      justified
    >
      <b-tab title="Alunos" active>
        <div v-if="loading">
          <div class="p-2" v-for="item in 5" :key="item.id">
            <CardAlunoLoading />
          </div>
        </div>
          <div class="p-2" v-for="item in alunosOn" :key="item.id">
            <CardAluno :dados="item" />
          </div>
      </b-tab>
      <b-tab title="Sets">
        <b-list-group>
        <div class="p-2" v-for="item in alunosSuperSets" :key="item.id">
          <SuperSetListItem :item="item"/>
        </div>
        </b-list-group>
      </b-tab>
      <b-tab title="Alunos Desativados">
        <div v-if="loading">
          <div class="p-2" v-for="item in 20" :key="item.id">
            <CardAlunoLoading />
          </div>
        </div>
          <div class="p-2" v-for="item in alunosOff" :key="item.id">
            <CardAluno :dados="item" />
          </div>
        </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import firebase from "firebase";
import CardAlunoLoading from "../components/CardAlunoLoading";
import CardAluno from "../components/CardAluno";
import SuperSetListItem from "../components/SuperSetListItem";
export default {
  name: "Alunos",
  components: {
    CardAlunoLoading,
    CardAluno,
    SuperSetListItem
  },
  data: function () {
    return {
      loading: true,
      alunosOn: [],
      alunosOff: [],
      alunosSuperSets: [],
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

          for (const key in dados) {
            if (dados[key].enabled == true) {
              this.alunosOn.push(dados[key]);
            } else {
              this.alunosOff.push(dados[key]);
            }
          }

          this.loading = false;
        });
      firebase
        .database()
        .ref(`${collection}/sets`)
        .once("value")
        .then((snapshot) => {
          let dados = snapshot.val();
          this.alunosSuperSets = dados;
        });
    },
  },
  mounted: function () {
    this.getData("alunos");
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
