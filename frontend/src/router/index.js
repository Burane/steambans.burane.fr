import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '@/views/Home';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: {
      name: 'home',
    }
  },
  {
    path: '/home/:param?',
    name: 'home',
    components: {
      homePage: HomeComponent,
    },
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router