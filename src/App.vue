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
      <b-nav-item to="/topicos" exact exact-active-class="active">
        Tópicos
      </b-nav-item>
      <b-nav-item to="/classroom" exact exact-active-class="active">
        Classroom
      </b-nav-item>
    </b-nav>
    <router-view />
  </b-container>
</template>

<script>
import { store } from '@/store'
export default {
  beforeCreate() {
    store.dispatch('getData')
  }
}
</script>

<style scoped>
#nav {
  background-color: white;
  /* position: absolute */
}

ul {
  list-style: none;
}

</style>