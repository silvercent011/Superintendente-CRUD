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
          <div class="p-2" v-for="item in 20" :key="item.key">
            <CardProfessorLoading />
          </div>
        </div>
        <div id="listControl">
          <div class="p-2" v-for="item in professoresOn" :key="item.key">
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
          <div class="p-2" v-for="item in profsSuperSets" :key="item.key">
            <SuperSetListItem :item="item" type="professores" />
          </div>
        </b-list-group>
      </b-tab>
      <b-tab title="Professores Desativados">
        <div v-if="loading">
          <div class="p-2" v-for="item in 20" :key="item.key">
            <CardProfessorLoading />
          </div>
        </div>
        <div id="listControl">
          <div class="p-2" v-for="item in professoresOff" :key="item.key">
            <CardProfessor :dados="item" />
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import { store } from "@/store";
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
  data() {
    return {
      profsSuperSets: {},
      professoresOn: {},
      professoresOff: {},
      loading: true,
    };
  },
  methods: {
    getData() {
          for (const key in store.state.database.professores.data) {
            if (store.state.database.professores.data[key].enabled == true) {
              this.$set(this.professoresOn, key,store.state.database.professores.data[key])
              // this.professoresOn.push(store.state.database.professores.data[key]);
            } else {
              this.$set(this.professoresOff, key,store.state.database.professores.data[key])
              // this.professoresOff.push(store.state.database.professores.data[key]);
            }
          this.loading = false;
          }
          if (store.state.database.professores.sets != null) {
            this.profsSuperSets = store.state.database.professores.sets;
          }
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
  created: function () {
    this.getData();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
