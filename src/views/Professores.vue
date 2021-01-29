<template>
  <b-card no-body>
    <b-tabs
      card
      active-nav-item-class="font-weight-bold text-uppercase"
      content-class="mt-3"
      justified
    >
      <b-tab title="Professores" active>
        <div v-if="loading">
          <div class="p-2" v-for="item in 20" :key="item.id">
            <CardProfessorLoading />
          </div>
        </div>
        <div id="listControl">
          <div class="p-2" v-for="item in professoresOn" :key="item.id">
            <CardProfessor :dados="item" />
          </div>
        </div>
      </b-tab>
      <b-tab title="Sets"><p>I'm the second tab</p></b-tab>
      <b-tab title="Professores Desativados">
        <div v-if="loading">
          <div class="p-2" v-for="item in 20" :key="item.id">
            <CardProfessorLoading />
          </div>
        </div>
        <div id="listControl">
          <div class="p-2" v-for="item in professoresOff" :key="item.id">
            <CardProfessor :dados="item" />
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import firebase from "firebase";
import CardProfessorLoading from "../components/CardProfessorLoading";
import CardProfessor from "../components/CardProfessor";
export default {
  name: "Professores",
  components: {
    CardProfessorLoading,
    CardProfessor,
  },
  data: function () {
    return {
      professoresOn: [],
      professoresOff: [],
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
          
          for (const key in dados) {
            if (dados[key].enabled == true) {
              this.professoresOn.push(dados[key]);
            } else {
              this.professoresOff.push(dados[key]);
            }
          }

          this.loading = false;
        });
    },
  },
  mounted: function () {
    this.getData("professores");
  },
  
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
