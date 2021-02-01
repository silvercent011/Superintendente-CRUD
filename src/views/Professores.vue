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
      <b-tab title="Sets">
        <b-button-toolbar justified>
          <b-button-group>
            <b-button @click="newSuperSet">Novo SuperSet</b-button>
            <b-button>Atualizar Dados</b-button>
            <b-button disabled>Disparar superintendente</b-button>
          </b-button-group>
        </b-button-toolbar>
        <b-list-group>
          <div class="p-2" v-for="item in profsSuperSets" :key="item.id">
            <SuperSetListItem :item="item" type="professores" />
          </div>
        </b-list-group>
      </b-tab>
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
import SuperSetListItem from "../components/SuperSetListItem";
export default {
  name: "Professores",
  components: {
    CardProfessorLoading,
    CardProfessor,
    SuperSetListItem
  },
  data: function () {
    return {
      profsSuperSets: {},
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
      firebase
        .database()
        .ref(`${collection}/sets`)
        .once("value")
        .then((snapshot) => {
          let dados = snapshot.val();
          if (dados != null) {
            this.profsSuperSets = dados;
          }
        });
    },
  newSuperSet() {
    let newSet = {
      key: String(Date.now()),
      default: false,
      nome: "Novo SuperSet",
      emails: [],
    };
    this.$set(this.profsSuperSets, newSet.key, newSet);
    this.$bvModal.show(newSet.key);
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
