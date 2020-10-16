import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue')
  },
  {
    path: '/bookings',
    name: 'Bookings',
    component: () => import('../components/Bookings.vue')
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import('../components/Invoices.vue')
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../components/Schedule.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
