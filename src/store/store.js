import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Authentication from './modules/Authentication'
import ProfileStepper from './modules/ProfileStepper'
import FarmProfile from './modules/FarmProfile'
import ProductCapture from './modules/ProductCapture'
import CropCapture from './modules/CropCapture'

const vuexLocal = new VuexPersistence({
  supportCircular: true, // to solve errors I was getting
  storage: window.localStorage,
  modules: ['Authentication', 'ProfileStepper', 'FarmProfile', 'CropCapture', 'ProductCapture'],
  // modules: ["MarketsMap", 'RegisterStall', 'Authentication', 'ModifyState']

});

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Authentication,
    ProfileStepper,
    FarmProfile,
    ProductCapture,
    CropCapture
  },
  plugins: [vuexLocal.plugin]
})

export default store