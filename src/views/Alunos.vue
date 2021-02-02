<template>
  <b-card no-body>
    <b-tabs
      card
      active-nav-item-class="font-weight-bold text-uppercase"
      content-class="mt-3"
      justified
    >
      <b-tab title="Alunos" active>
        <div>
          <vue-bootstrap-typeahead
            v-model="query"
            :data="searchOn"
            :serializer="(aluno) => `${aluno.matricula} - ${aluno.nome}`"
            @hit="openModalAluno($event)"
          />
        </div>
        <div v-if="loading">
          <div class="p-2" v-for="item in 5" :key="item.key">
            <CardAlunoLoading />
          </div>
        </div>
        <div class="p-2" v-for="item in alunosOn" :key="item.key">
          <CardAluno :dados="item" />
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
          <div class="p-2" v-for="item in alunosSuperSets" :key="item.key">
            <SuperSetListItem :item="item" type="alunos" />
          </div>
        </b-list-group>
      </b-tab>
      <b-tab title="Alunos Desativados">
                  <vue-bootstrap-typeahead
            v-model="query"
            :data="searchOff"
            :serializer="(aluno) => `${aluno.matricula} - ${aluno.nome}`"
            @hit="openModalAluno($event)"
          />
        <div v-if="loading">
          <div class="p-2" v-for="item in 20" :key="item.key">
            <CardAlunoLoading />
          </div>
        </div>
        <div v-else>
          <div class="p-2" v-for="item in alunosOff" :key="item.key">
            <CardAluno :dados="item" />
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import { store } from "@/store";
export default {
  name: "Alunos",
  components: {
    CardAlunoLoading: () => import("@/components/CardAlunoLoading"),
    CardAluno: () => import("@/components/CardAluno"),
    SuperSetListItem: () => import("@/components/SuperSetListItem"),
  },
  data: function () {
    return {
      query: "",
      loading: true,
      alunosOn: {},
      alunosOff: {},
      alunosSuperSets: {},
      searchOn: [],
      searchOff: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    openModalAluno(dados){
      this.$bvModal.show(dados.matricula);
    },
    getData() {
      if (store.state.database.alunos.data != null) {
        for (const key in store.state.database.alunos.data) {
          if (store.state.database.alunos.data[key].enabled == true) {
            this.$set(
              this.alunosOn,
              key,
              store.state.database.alunos.data[key]
            );
            this.searchOn.push(store.state.database.alunos.data[key]);
            // this.alunosOn.push(store.state.database.alunos.data[key]);
          } else {
            this.$set(
              this.alunosOff,
              key,
              store.state.database.alunos.data[key]
            );
            this.searchOff.push(store.state.database.alunos.data[key]);
            // this.alunosOff.push(store.state.database.alunos.data[key]);
          }
        }

        this.loading = false;
      }
      this.alunosSuperSets = store.state.database.alunos.sets;
    },
    newSuperSet() {
      let newSet = {
        key: String(Date.now()),
        default: false,
        nome: "Novo SuperSet",
        emails: [],
      };
      this.$set(this.alunosSuperSets, newSet.key, newSet);
      this.$bvModal.show(newSet.key);
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
