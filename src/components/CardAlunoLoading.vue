<template>
  <div>
    <b-overlay show rounded="sm" variant="white">
      <b-card
        bg-variant="dark"
        text-variant="white"
        title="--------------------"
        sub-title="--------------"
      >
        <b-card-text> Matrícula: <br />Turma: <br />Turno: </b-card-text>
        <b-button href="#" variant="primary">Detalhes</b-button>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "CardAlunoLoading",
};
</script>

<style>
</style>