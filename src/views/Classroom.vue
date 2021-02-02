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
            <b-button @click="newClass">Nova Class</b-button>
            <b-button>Atualizar Dados</b-button>
            <b-button disabled>Disparar superintendente</b-button>
          </b-button-group>
        </b-button-toolbar>
        <b-list-group>
          <div class="p-2" v-for="item in classroom" :key="item.key">
            <b-list-group-item
              v-b-modal="item.key"
              class="d-flex justify-content-between align-items-center"
            >
              {{ item.nome }}
              <ClassroomEditForm :dados="item" type="class" />
            </b-list-group-item>
          </div>
        </b-list-group>
      </b-tab>
      <!-- <b-tab title="Sets">
        <b-button-toolbar justified>
          <b-button-group>
            <b-button @click="newSuperSet">Novo SuperSet</b-button>
            <b-button>Atualizar Dados</b-button>
            <b-button disabled>Disparar superintendente</b-button>
          </b-button-group>
        </b-button-toolbar>
        <b-list-group>
          <div class="p-2" v-for="item in classroomSuperSets" :key="item.key">
            <SuperSetListItem :item="item" type="class" model="sets" />
          </div>
        </b-list-group>
      </b-tab> -->
    </b-tabs>
  </b-card>
</template>

<script>
import { store } from "@/store";
import ClassroomEditForm from "@/components/ClassroomEditForm";
export default {
  name: "Classroom",
  components: {
    ClassroomEditForm,
  },
  data: function () {
    return {
      newModal: true,
      loading: true,
      classroom: {},
      classroomSuperSets: {},
    };
  },
  methods: {
    getData() {
      if (store.state.database.classroom.data != null) {
        this.classroom = store.state.database.classroom.data;
      }
      this.loading = false;

      if (store.state.database.classroom.sets != null) {
        this.classroomSuperSets = store.state.database.classroom.sets;
      }
    },

    newClass() {
      let newSet = {
        key: String(Date.now()),
        nome: "Nova Sala",
        classroomID:null,
        setorTurma: null,

        topicosOPT: [],
        topicosSetsOPT: [],

        alunosOPT: [],
        alunosSetOPT: [],

        professoresOPT: [],
        professoresSetsOPT: [],
      };
      this.$set(this.classroom, newSet.key, newSet);
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>