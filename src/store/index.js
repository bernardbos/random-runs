import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: process.env.VUE_APP_TITLE,
  },
  mutations: {
  },
  getters: {
    getAppName:  state => {
      return state.appName
    }
  },
  modules: {
  }
})
