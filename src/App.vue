<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3" md="2">
        <b-nav vertical class="w-50">
          <b-nav-item><router-link to="/alunos">Alunos</router-link></b-nav-item>
        </b-nav>
      </b-col>
      <b-col>
        <router-view />
      </b-col>
    </b-row>
  </b-container>
</template>
