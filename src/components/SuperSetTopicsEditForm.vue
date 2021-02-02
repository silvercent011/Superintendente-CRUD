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

      <b-form-group id="input-group-2" label="Tópicos:" label-for="input-topicos">
        <b-form-tags
          :disabled="form.default"
          input-id="input-topicos"
          v-model="form.topicos"
          tag-variant="primary"
          tag-pills
          separator=";"
          size="sm"
          placeholder="Adicionar e-mails"
        ></b-form-tags>
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
  name: "SuperSetTopicsEditForm",
  props: ["dados","type",],
  data() {
    return {
      form: {
        key: this.$props.dados.key,
        nome: this.$props.dados.nome,
        topicos: this.$props.dados.topicos,
      },
    };
  },
  methods: {
    updateData() {
      let newData = {
        nome: this.form.nome,
        key: this.form.key,
        topicos: this.form.topicos,
      };
      console.log(newData)
      firebase.database().ref(`/${this.$props.type}/sets/` + this.form.key).update(newData)
      this.$props.dados.key = newData.key
      this.$props.dados.nome = newData.nome
      this.$props.dados.topicos = newData.topicos
      this.$bvModal.hide(this.form.key);
    },
    deleteSet() {
      let ref = firebase.database().ref(`/${this.$props.type}/sets/` + this.form.key)
      ref.remove()
      this.$bvModal.hide(this.form.key)
      this.$bvModal.hide(this.form.key);
    },
    changeEnabledStatus() {}
  },
};
</script>

<style>
</style>