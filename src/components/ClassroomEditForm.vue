<template>
  <b-modal
    :id="dados.key"
    :ref="dados.key"
    centered
    size="lg"
    :title="dados.nome + ' - Editar CLASS'"
    :hide-footer="true"
  >
    <b-form>
      <b-form-group id="input-group-1" label="Nome da Sala:" label-for="input-nome">
        <b-form-input
          :disabled="form.default"
          id="input-nome"
          v-model="form.nome"
          type="text"
          placeholder="Nome da Sala"
          required
        ></b-form-input>
      </b-form-group>

<b-tabs>
  <b-tab title="Alunos">

      <!-- ALUNOS -->
      <b-form-group
        id="input-group-2"
        label="Alunos individuais:"
        label-for="input-emails"
      >
        <b-form-tags
          :disabled="false"
          input-id="input-emails"
          v-model="form.alunosOPT"
          tag-variant="primary"
          separator=";"
          tag-pills
          size="sm"
          placeholder="Adicionar e-mails"
        ></b-form-tags>
      </b-form-group>
      <vue-bootstrap-typeahead
        v-model="query"
        :data="form.alunos"
        :serializer="(aluno) => `${aluno.nome} - ${aluno.email}`"
        @hit="addAlunoInd($event)"
      />
      <!-- SET ALUNOS -->
      <b-form-group
        id="input-group-2"
        label="SuperSets - Alunos:"
        label-for="input-emails"
      >
        <b-form-tags
          :disabled="false"
          input-id="input-emails"
          v-model="form.alunosSetOPT"
          tag-variant="primary"
          separator=";"
          tag-pills
          size="sm"
          placeholder="Adicionar sets"
        ></b-form-tags>
      </b-form-group>
      <vue-bootstrap-typeahead
        v-model="query2"
        :data="form.alunosSets"
        :serializer="(set) => `${set.nome}`"
        @hit="addAlunoSet($event)"
      />
  </b-tab>
<b-tab title="Professores">
      <!-- PROFESSORES -->
      <b-form-group
        id="input-group-2"
        label="Professores individuais:"
        label-for="input-emails"
      >
        <b-form-tags
          :disabled="false"
          input-id="input-emails"
          v-model="form.professoresOPT"
          tag-variant="primary"
          separator=";"
          tag-pills
          size="sm"
          placeholder="Adicionar e-mails"
        ></b-form-tags>
      </b-form-group>
      <vue-bootstrap-typeahead
        v-model="query3"
        :data="form.professores"
        :serializer="(professor) => `${professor.nome} - ${professor.email}`"
        @hit="addProfInd($event)"
      />
      <!-- PROFESSORES Sets -->
      <b-form-group
        id="input-group-2"
        label="SuperSets - Professores:"
        label-for="input-emails"
      >
        <b-form-tags
          :disabled="false"
          input-id="input-emails"
          v-model="form.professoresSetsOPT"
          tag-variant="primary"
          separator=";"
          tag-pills
          size="sm"
          placeholder="Adicionar sets"
        ></b-form-tags>
      </b-form-group>
      <vue-bootstrap-typeahead
        v-model="query4"
        :data="form.professoresSets"
        :serializer="(set) => `${set.nome}`"
        @hit="addProfSet($event)"
      />
</b-tab>
<b-tab title="Tópicos">
      <!-- TOPICOS -->
      <b-form-group
        id="input-group-2"
        label="Tópicos individuais:"
        label-for="input-emails"
      >
        <b-form-tags
          :disabled="false"
          input-id="input-emails"
          v-model="form.topicosOPT"
          tag-variant="primary"
          separator=";"
          tag-pills
          size="sm"
          placeholder="Adicionar e-mails"
        ></b-form-tags>
      </b-form-group>
      <vue-bootstrap-typeahead
        v-model="query5"
        :data="form.topicos"
        :serializer="(topicos) => `${topicos.nome}`"
        @hit="addTopicInd($event)"
      />
      <!-- TOPICOS Sets -->
      <b-form-group
        id="input-group-2"
        label="SuperSets - Tópicos:"
        label-for="input-emails"
      >
        <b-form-tags
          :disabled="false"
          input-id="input-emails"
          v-model="form.topicosSetsOPT"
          tag-variant="primary"
          separator=";"
          tag-pills
          size="sm"
          placeholder="Adicionar sets"
        ></b-form-tags>
      </b-form-group>
      <vue-bootstrap-typeahead
        v-model="query6"
        :data="form.topicosSets"
        :serializer="(set) => `${set.nome}`"
        @hit="addTopicSet($event)"
      />
</b-tab>

      <b-col>
        <b-row class="py-2">
          <b-button
            v-on:click="updateData"
            type="submit"
            variant="primary"
            :disabled="form.default"
            block
            >Salvar</b-button
          >
        </b-row>
        <!-- <b-row class="py-2">
          <b-button
            :disabled="form.default"
            v-on:click="deleteSet"
            variant="danger"
            block
            >Excluir SuperSet</b-button
          >
        </b-row> -->
      </b-col>
      </b-tabs>
    </b-form>
  </b-modal>
</template>

<script>
import firebase from "firebase";
import { store } from "@/store";
export default {
  name: "ClassroomEditForm",
  props: ["dados", "type"],
  data() {
    return {
      optionsSetor: ["Ed.Infantil", "Fund.1", "Fund.2", "Médio"],
      query: "",
      query2: "",
      query3: "",
      query4: "",
      query5: "",
      query6: "",
      form: {
        nome: this.$props.dados.nome,
        key: this.$props.dados.key,
        classroomID: this.$props.dados.classroomID,
        setorTurma: this.$props.dados.setorTurma,

        topicosOPT: this.$props.dados.topicosOPT,
        topicos: [],
        topicosSetsOPT: this.$props.dados.topicosSetsOPT,
        topicosSets: [],

        alunosOPT: this.$props.dados.alunosOPT,
        alunos: [],
        alunosSetOPT: this.$props.dados.alunosSetOPT,
        alunosSets: [],

        professoresOPT: this.$props.dados.professoresOPT,
        professores: [],
        professoresSetsOPT: this.$props.dados.professoresSetsOPT,
        professoresSets: [],
      },
    };
  },
  methods: {
    addAlunoInd(event) {
      this.form.alunosOPT.push(event.email);
    },
    addAlunoSet(event) {
      this.form.alunosSetOPT.push(event.nome);
    },
    addProfInd(event) {
      this.form.professoresOPT.push(event.email);
    },
    addProfSet(event) {
      this.form.professoresSetsOPT.push(event.nome);
    },
    addTopicInd(event) {
      this.form.topicosOPT.push(event.email);
    },
    addTopicSet(event) {
      this.form.topicosSetsOPT.push(event.nome);
    },
    updateData() {
      let newData = {
        key: this.form.key,
        nome: this.form.nome,
        classroomID:null,
        setorTurma: this.form.setorTurma,

        topicosOPT: this.form.topicosOPT,
        topicosSetsOPT: this.form.topicosSetsOPT,

        alunosOPT: this.form.alunosOPT,
        alunosSetOPT: this.form.alunosSetOPT,

        professoresOPT: this.form.professoresOPT,
        professoresSetsOPT: this.form.professoresSetsOPT,
      };
      console.log(newData);
      firebase
        .database()
        .ref(`/classroom/data/` + this.form.key)
        .update(newData);
      this.$props.dados = newData
      store.dispatch('getData')
    },
  },

  mounted() {
    for (const key in store.state.database.alunos.data) {
      if (store.state.database.alunos.data[key].enabled == true) {
        this.form.alunos.push(store.state.database.alunos.data[key]);
      }
    }

    for (const key in store.state.database.professores.data) {
      if (store.state.database.professores.data[key].enabled == true) {
        this.form.professores.push(store.state.database.professores.data[key]);
      }
    }
    for (const key in store.state.database.topicos.data) {
      this.form.topicos.push(store.state.database.topicos.data[key]);
    }

    for (const key in store.state.database.alunos.sets) {
      this.form.alunosSets.push(store.state.database.alunos.sets[key]);
    }

    for (const key in store.state.database.professores.sets) {
      this.form.professoresSets.push(
        store.state.database.professores.sets[key]
      );
    }
    for (const key in store.state.database.topicos.sets) {
      this.form.topicosSets.push(store.state.database.topicos.sets[key]);
    }
  },
};
</script>

<style>
</style>