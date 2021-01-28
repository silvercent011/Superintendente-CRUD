<template>
  <b-modal
    :id="dados.matricula"
    centered
    :title="dados.matricula + ' - Editar'"
    hide-footer="true"
  >
    <b-form @submit="updateData">
      <b-form-group id="input-group-1" label="Nome:" label-for="input-nome">
        <b-form-input
          id="input-nome"
          v-model="form.nome"
          type="text"
          placeholder="Nome"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email:" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Turno:" label-for="input-turno">
        <b-form-select
          id="input-turno"
          v-model="form.turno"
          :options="turnos"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" label="Turma:" label-for="input-turma">
        <b-form-input
          id="input-turma"
          v-model="form.turma"
          type="text"
          placeholder="turma"
          required
          disabled
        ></b-form-input>
      </b-form-group>
      <b-col>
        <b-row class="py-2">
          <b-button type="submit" variant="primary" block
            >Atualizar Dados</b-button
          >
        </b-row>
        <b-row class="py-2">
          <b-button
            v-if="form.enabled"
            v-on:click="changeEnabledStatus"
            variant="danger"
            block
            >Desativar Aluno</b-button
          >
          <b-button
            v-if="!form.enabled"
            v-on:click="changeEnabledStatus"
            variant="warning"
            block
            >Ativar Aluno</b-button
          >
        </b-row>
      </b-col>
    </b-form>
  </b-modal>
</template>

<script>
import firebase from "firebase";
export default {
  name: "AlunoEditForm",
  props: ["dados"],
  data() {
    return {
      form: {
        nome: this.$props.dados.nome,
        email: this.$props.dados.email,
        turno: this.$props.dados.turno,
        // MUDAR TURMA PARA SELEÇÃO QUANDO CRIAR A SEÇÃO DE TURMAS
        turma: this.$props.dados.turma,
        enabled: this.$props.dados.enabled,
      },
      turnos: [{ text: "Selecione", value: null }, "Manhã", "Tarde"],
    };
  },
  methods: {
    updateData() {
      let newData = {
        nome: this.form.nome,
        email: this.form.email,
        turno: this.form.turno,
        turma: this.form.turma,
      };
      firebase
        .database()
        .ref("/alunos/data/" + this.$props.dados.matricula)
        .update(newData);
      this.$props.dados.nome = this.form.nome;
      this.$props.dados.email = this.form.email;
      this.$props.dados.turno = this.form.turno;
      this.$props.dados.turma = this.form.turma;
    },
    changeEnabledStatus() {
      this.form.enabled = !this.form.enabled;
      let newData = {
        enabled: this.form.enabled,
      };
      firebase
        .database()
        .ref("/alunos/data/" + this.$props.dados.matricula)
        .update(newData);
      this.$props.dados.enabled = this.form.enabled;
    },
  },
};
</script>

<style>
</style>