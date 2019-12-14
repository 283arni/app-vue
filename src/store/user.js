import * as fb from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registr({commit},{email, password}) {
      commit('resetErr')
      commit('setLoad', true)
      try {
        const response = await fb.auth().createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(response.user.uid));
        commit('setLoad', false);
      } catch(error) {
        commit('setLoad', false)
        commit('setErr', error.message)
        throw error
      }
    },
    async logTo({commit},{email, password}) {
      commit('resetErr')
      commit('setLoad', true)
      try {
        const response = await fb.auth().signInWithEmailAndPassword(email, password);
        commit('setUser', new User(response.user.uid));
        commit('setLoad', false);
      } catch(error) {
        commit('setLoad', false)
        commit('setErr', error.message)
        throw error
      }
    },
    autoLog({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    logOut({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    loginTrue(state) {
      return state.user !== null
    }
  }
}