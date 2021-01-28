<template>
  <b-card
    bg-variant="dark"
    text-variant="white"
    :title="dados.nome"
    :sub-title="dados.email"
  >
    <b-card-text>
      Matrícula: {{ dados.matricula }} <br />
      Turma: {{ dados.turma }} - {{ dados.nivel }} <br />
      Turno: {{ dados.turno }}
    </b-card-text>
    <div>
      <AlunoEditForm :dados="dados" />
      <b-button v-b-modal="dados.matricula" variant="primary">Editar</b-button>
    </div>
  </b-card>
</template>

<script>
import AlunoEditForm from "@/components/AlunoEditForm";
export default {
  name: "CardAluno",
  components: {
    AlunoEditForm,
  },
  props: ["dados"],
};
</script>

<style>
</style>