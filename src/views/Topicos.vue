<template>
  <b-card no-body>
    <b-tabs
      card
      active-nav-item-class="font-weight-bold text-uppercase"
      content-class="mt-3"
      justified
    >
      <b-tab title="Tópicos">
        <b-button-toolbar justified>
          <b-button-group>
            <b-button @click="newTopico">Novo Topico</b-button>
            <b-button>Atualizar Dados</b-button>
            <b-button disabled>Disparar superintendente</b-button>
          </b-button-group>
        </b-button-toolbar>
        <b-list-group>
          <div class="p-2" v-for="item in topicos" :key="item.key">
            <SuperSetListItem :item="item" type="topicos" model="data" />
          </div>
        </b-list-group>
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
          <div class="p-2" v-for="item in topicosSuperSets" :key="item.key">
            <SuperSetListItem :item="item" type="topicos" model="sets" />
          </div>
        </b-list-group>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import { store } from "@/store";
import SuperSetListItem from "../components/SuperSetListItem";
export default {
  name: "Topicos",
  components: {
    SuperSetListItem,
  },
  data: function () {
    return {
      newModal: true,
      loading: true,
      topicos: {},
      topicosSuperSets: {},
    };
  },
  methods: {
    getData() {
      if (store.state.database.topicos.data != null) {
        this.topicos = store.state.database.topicos.data;
      }
      this.loading = false;

      if (store.state.database.topicos.sets != null) {
        this.topicosSuperSets = store.state.database.topicos.sets;
      }
    },
    newSuperSet() {
      let newSet = {
        key: String(Date.now()),
        nome: "Novo SuperSet",
      };
      this.$set(this.topicosSuperSets, newSet.key, newSet);
      this.$bvModal.show(newSet.key);
    },

    newTopico() {
      let newSet = {
        key: String(Date.now()),
        nome: "Novo Tópico",
      };
      this.$set(this.topicos, newSet.key, newSet);
      this.$bvModal.show(newSet.key);
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>