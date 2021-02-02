<template>
  <b-modal
    :id="dados.key"
    :ref="dados.key"
    centered
    size="lg"
    :title="dados.nome + ' - Editar'"
    :hide-footer="true"
  >
    <b-form>
      <div v-if="form.default">
        <b-alert show variant="danger"
          >ATENÇÃO! O set selecionado é atualizado frequentemente pelo
          superintendente, não é possível salvar, modificar ou excluir este
          superset.</b-alert
        >
      </div>

      <b-form-group id="input-group-1" label="Nome:" label-for="input-nome">
        <b-form-input
          :disabled="form.default"
          id="input-nome"
          v-model="form.nome"
          type="text"
          placeholder="Nome"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Emails:" label-for="input-emails">
        <b-form-tags
          :disabled="form.default"
          input-id="input-emails"
          v-model="form.emails"
          tag-variant="primary"
          separator=";"
          tag-pills
          size="sm"
          placeholder="Adicionar e-mails"
        ></b-form-tags>
      </b-form-group>

      <!-- <b-form-input list="my-list-id" @submit="addFromList($event)"></b-form-input>
      <datalist id="my-list-id">
        <option>Manual Option</option>
        <option v-for="item in items" :key="item.key">{{ item.email }}</option>
      </datalist> -->

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
        <b-row class="py-2">
          <b-button
            :disabled="form.default"
            v-on:click="deleteSet"
            variant="danger"
            block
            >Excluir SuperSet</b-button
          >
        </b-row>
      </b-col>
    </b-form>
  </b-modal>
</template>

<script>
// import { store } from "@/store";
import firebase from "firebase";
export default {
  name: "SuperSetEditForm",
  props: ["dados", "type"],
  data() {
    return {
      // items: store.state.database.alunos.data,
      form: {
        key: this.$props.dados.key,
        default: this.$props.dados.default,
        nome: this.$props.dados.nome,
        emails: this.$props.dados.emails,
      },
    };
  },
  methods: {
    updateData() {
      let newData = {
        nome: this.form.nome,
        key: this.form.key,
        emails: this.form.emails,
        default: this.form.default,
      };
      console.log(newData);
      firebase
        .database()
        .ref(`/${this.$props.type}/sets/` + this.form.key)
        .update(newData);
      this.$props.dados.key = newData.key;
      this.$props.dados.default = newData.default;
      this.$props.dados.nome = newData.nome;
      this.$props.dados.emails = newData.emails;
    },
    deleteSet() {
      let ref = firebase
        .database()
        .ref(`/${this.$props.type}/sets/` + this.form.key);
      ref.remove();
      this.$bvModal.hide(this.form.key);
    },
    changeEnabledStatus() {},
  },
};
</script>

<style>
</style>