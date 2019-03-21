import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Authentication from './modules/Authentication'

const vuexLocal = new VuexPersistence({
  supportCircular: true, // to solve errors I was getting
  storage: window.localStorage,
  modules: ['Authentication'],
  // modules: ["MarketsMap", 'RegisterStall', 'Authentication', 'ModifyState']

});

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Authentication,
  },
  plugins: [vuexLocal.plugin]
})

export default store