export default {
  state: {
    load: false,
    err: null
  },
  mutations: {
    setLoad(state, payload) {
      state.load = payload
    },
    setErr(state, payload) {
      state.err = payload
    },
    resetErr(state) {
      state.err = null
    }
  },
  actions: {
    setLoad({commit}, payload) {
      commit('setLoad', payload)
    },
    setErr({commit}, payload) {
      commit('setErr', payload)
    },
    resetErr({commit}) {
      commit('resetErr')
    }
  },
  getters: {
    load(state) {
      return state.load
    },
    err(state) {
      return state.err
    }
  }
}