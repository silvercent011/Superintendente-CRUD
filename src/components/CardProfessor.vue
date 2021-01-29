<template>
  <b-card
    :title="dados.nome"
    :sub-title="dados.email"
  >
    <div>
      <ProfessorEditForm :dados="dados" />
      <b-button v-b-modal="dados.email" variant="primary">Editar</b-button>
    </div>
  </b-card>
</template>

<script>
import ProfessorEditForm from "@/components/ProfessorEditForm";
export default {
  name: "CardProfessor",
  components: {
    ProfessorEditForm,
  },
  props: ["dados"],
};
</script>

<style>
</style>