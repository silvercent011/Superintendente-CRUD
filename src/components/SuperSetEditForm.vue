<template>
  <b-modal
    :id="dados.id"
    centered
    :title="dados.nome + ' - Editar'"
    :hide-footer="true"
  >
    <b-form>

        <div v-if="form.default" >
            <b-alert show variant="danger">ATENÇÃO! O set selecionado é atualizado frequentemente pelo superintendente, alterações salvas serão perdidas na próxima rotina do script.</b-alert>
        </div>

      <b-form-group id="input-group-1" label="Nome:" label-for="input-nome">
        <b-form-input
          id="input-nome"
          v-model="form.nome"
          type="text"
          placeholder="Nome"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Emails:" label-for="input-emails">
        <b-form-tags
          input-id="input-emails"
          v-model="form.emails"
          tag-variant="primary"
          tag-pills
          size="sm"
          placeholder="Adicionar e-mails"
        ></b-form-tags>
      </b-form-group>

      <b-col>
        <b-row class="py-2">
          <b-button type="submit" variant="primary" block>Salvar</b-button>
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
// import firebase from "firebase";
export default {
  name: "SuperSetEditForm",
  props: ["dados"],
  data() {
    return {
      form: {
        default: this.$props.dados.default,
        nome: this.$props.dados.nome,
        emails: this.$props.dados.emails,
        enabled: this.$props.dados.enabled,
      },
    };
  },
  methods: {
    updateData() {},
    changeEnabledStatus() {},
  },
};
</script>

<style>
</style>