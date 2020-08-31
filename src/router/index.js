import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/table',
      component: () => import('../components/table.vue')
    }, {
      path: '/tree',
      component: () => import('../components/tree.vue')
    }
  ]
})