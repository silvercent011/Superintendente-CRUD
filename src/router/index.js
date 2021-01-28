import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/alunos',
    name: 'Alunos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Alunos.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
