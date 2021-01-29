<template>
  <b-container fluid>
    <b-nav fixed pills align="center" class="py-4 navbar" id="nav">
      <b-nav-item to="/" exact exact-active-class="active">
        Home
      </b-nav-item>
      <b-nav-item to="/alunos" exact exact-active-class="active">
        Alunos
      </b-nav-item>
      <b-nav-item to="/professores" exact exact-active-class="active">
        Professores
      </b-nav-item>
      <b-nav-item to="" exact exact-active-class="active" disabled>
        Turmas
      </b-nav-item>
      <b-nav-item to="" exact exact-active-class="active" disabled>
        Disciplinas
      </b-nav-item>
      <b-nav-item to="" exact exact-active-class="active" disabled>
        Tópicos
      </b-nav-item>
      <b-nav-item to="" exact exact-active-class="active" disabled>
        Classroom
      </b-nav-item>
    </b-nav>
    <router-view />
  </b-container>
</template>

<style scoped>
#nav {
  background-color: white;
  /* position: absolute */
}

ul {
  list-style: none;
}

</style>