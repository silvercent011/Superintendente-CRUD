import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/alunos',
    name: 'Alunos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Alunos.vue')
  },
  {
    path: '/professores',
    name: 'Professores',
    component: () => import(/* webpackChunkName: "about" */ '../views/Professores.vue')
  },
  {
    path: '/topicos',
    name: 'Topicos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Topicos.vue')
  },
  {
    path: '/classroom',
    name: 'Classroom',
    component: () => import(/* webpackChunkName: "about" */ '../views/Classroom.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
