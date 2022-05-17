import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import store from '@/store'
import { Buffer } from "buffer"
import App from './../App.vue'
import CarreraView from "../views/admin/carrera/CarreraView.vue"
import MostrarCarreraView from "../views/admin/carrera/MostrarCarreraView.vue"

const routes = [
  {
    path: '/admin',
    name: 'app',
    component: App,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {requireAuth: true}
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: {requireAuth: true}
      }, 
      {
        path: 'carrera',
        name: 'Carrera',
        component: CarreraView
      },
      {
        path: 'carrera/:id',
        name: 'MostrarCarrera',
        component: MostrarCarreraView
      }

    ]
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// guard
router.beforeEach((to, from, next) => {
  console.log(to)
  if(to.meta.requireAuth){
    if(store.state.auth != null){
      next();
    }

      let auth = localStorage.getItem("auth");
      let authJson = JSON.parse(Buffer.from(auth, 'base64').toString('ascii'));
      if(authJson.access_token){
        next()
      }
    

    next("login")
  }

  next();
});

export default router
