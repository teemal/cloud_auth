import Vue from 'vue'
import VueRouter from 'vue-router'
import UserCredentials from '../views/UserCredentials'
import Signup from '../views/Signup'
import Userpage from '../views/Userpage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'user-credentials',
    component: UserCredentials,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/userpage/:uid',
    name: 'userpage',
    component: Userpage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
