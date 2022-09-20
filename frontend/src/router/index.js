import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerView from '../views/CustomerView.vue'
import HotelView from '../views/HotelView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/customer',  
    name: 'CustomerView',
    component: CustomerView
  },
  {
    path: '/hotel',
    name: 'HotelView',
    component: HotelView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
