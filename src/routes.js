import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Regist from '@/components/auth/Regist'
import New from '@/components/add/New'
import Order from '@/components/user/Order'
import All from '@/components/add/All'
import Advert from '@/components/add/Advert'
import AuthGuard from '@/auth-guard'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/enter',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'regist',
      component: Regist
    },
    {
      path: '/new/:id',
      name: 'new',
      component: New,
      beforeEnter: AuthGuard
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      beforeEnter: AuthGuard
    },
    {
      path: '/all',
      name: 'all',
      component: All,
      beforeEnter: AuthGuard
    },
    {
      path: '/advert/:id',
      props: true,
      name: 'advert',
      component: Advert
    }
  ],
  mode: 'history'
})