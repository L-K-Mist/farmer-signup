import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import AppState from './modules/AppState'
import Authentication from './modules/Authentication'

const vuexLocal = new VuexPersistence({
  supportCircular: true, // to solve errors I was getting
  storage: window.localStorage,
  modules: ["MarketsMap", 'AppState', 'Authentication', 'ModifyState'],
  // modules: ["MarketsMap", 'RegisterStall', 'Authentication', 'ModifyState']

});

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppState,
    Authentication,
  },
  plugins: [vuexLocal.plugin]
})

export default store