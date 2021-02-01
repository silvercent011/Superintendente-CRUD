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
import firebase from "firebase";
export default {
  name: "SuperSetEditForm",
  props: ["dados","type","model"],
  data() {
    return {
      form: {
        key: this.$props.dados.key,
        nome: this.$props.dados.nome,
      },
    };
  },
  methods: {
    updateData() {
      let newData = {
        nome: this.form.nome,
        key: this.form.key,
      };
      console.log(newData)
      firebase.database().ref(`/${this.$props.type}/${this.$props.model}/` + this.form.key).update(newData)
      this.$props.dados.key = newData.key
      this.$props.dados.nome = newData.nome
    },
    deleteSet() {
      let ref = firebase.database().ref(`/${this.$props.type}/${this.$props.model}/` + this.form.key)
      ref.remove()
      this.$bvModal.hide(this.form.key)
    },
    changeEnabledStatus() {}
  },
};
</script>

<style>
</style>