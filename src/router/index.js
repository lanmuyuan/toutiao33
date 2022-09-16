import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('views/Layout/index.vue'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:"base" */ 'views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName:"base" */ 'views/QA')
      },
      {
        path: '/profile',
        component: () => import('views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('views/Login/index.vue')
  },
  {
    path: '/search',
    component: () =>
      import(/* webpackChunkName:"search" */ 'views/Search/index.vue')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName:"user" */ 'views/user')
  },
  {
    path: '/detail',
    component: () => import(/* webpackChunkName:"article" */ 'views/Article')
  }
]

const router = new VueRouter({
  routes
})

export default router
