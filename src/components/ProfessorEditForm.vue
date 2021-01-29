<template>
  <b-modal
    :id="dados.email"
    centered
    :title="dados.nome + ' - Editar'"
    :hide-footer="true"
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
            >Desativar Professor</b-button
          >
          <b-button
            v-if="!form.enabled"
            v-on:click="changeEnabledStatus"
            variant="warning"
            block
            >Ativar Professor</b-button
          >
        </b-row>
      </b-col>
    </b-form>
  </b-modal>
</template>

<script>
import firebase from "firebase";
export default {
  name: "ProfessorEditForm",
  props: ["dados"],
  data() {
    return {
      form: {
        nome: this.$props.dados.nome,
        email: this.$props.dados.email,
        enabled: this.$props.dados.enabled,
      },
    };
  },
  methods: {
    updateData() {
      let newData = {
        nome: this.form.nome,
        email: this.form.email,
      };
      firebase
        .database()
        .ref("/professores/data/" + this.$props.dados.matricula)
        .update(newData);
      this.$props.dados.nome = this.form.nome;
      this.$props.dados.email = this.form.email;
    },
    changeEnabledStatus() {
      this.form.enabled = !this.form.enabled;
      let newData = {
        enabled: this.form.enabled,
      };
      firebase
        .database()
        .ref("/professores/data/" + this.$props.dados.matricula)
        .update(newData);
      this.$props.dados.enabled = this.form.enabled;
    },
  },
};
</script>

<style>
</style>