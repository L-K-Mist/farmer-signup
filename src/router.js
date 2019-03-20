import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
import Home from './views/Home.vue'
import Callback from "@/views/Callback.vue"
import Login from "@/views/Login.vue"
import FarmProfile from './views/FarmProfile.vue';
import CropCapture from './views/CropCapture.vue';
import ProductCapture from './views/ProductCapture.vue';

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/farm-profile',
      name: 'FarmProfile',
      component: FarmProfile,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/crop-capture',
      name: 'CropCapture',
      component: CropCapture,
      meta: {
        requiresAuth: true
      },
    }, {
      path: '/products',
      name: 'ProductCapture',
      component: ProductCapture,
      meta: {
        requiresAuth: true
      },
    },
  ]
});


router.beforeEach((to, from, next) => {

  var isLoggedIn = store.getters.isLoggedIn
  console.log("​isLoggedIn top of router beforeEach", isLoggedIn)

  const routerToName = to.name

  if (to.name === 'callback' || to.name === 'login') { // check if "to"-route is "callback" or login and allow access

    console.log("Router is allowing callback or login")
    next()
  } else if (to.matched.some(record => record.meta.requiresAuth)) { // if this route requires auth
    store.commit('newRoute', routerToName)
    if (isLoggedIn) { // if authenticated allow access
      console.log('routerTriggered as if logged in')
      next()
    } else { // trigger auth0 login
      console.log("router is requiring login")
      router.push("/login")
    }
  } else {
    next(); // ... otherwise, we allow the user to continue as intended.
  }
})

export default router