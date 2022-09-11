import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: {}
  },
  getters: {
    isLogin(state) {
      return state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  plugins: [
    createPersistedState({
      key: 'heimatoutiao',
      reducer({ tokenObj }) {
        return tokenObj
      }
    })
  ]
})
