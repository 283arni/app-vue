import * as fb from 'firebase'

class Order {
  constructor (name, phone, advertId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.advertId = advertId
    this.done = done
    this.id = id
  }
}

export default {

  state: {
    orders: []
  },
  mutations: {
    createOrder(state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder({commit}, {name, phone, advertId, ownerId }) {
      const order = new Order(name, phone, advertId)
      commit('resetErr')

      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setErr', error.message)
        throw error
      }
    },
    async getOrders({commit, getters}) {
      commit('setLoad', true)
      commit('resetErr')

      const resultOrders = []

      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()

        Object.keys(orders).forEach(key => {
          const order = orders[key]
          resultOrders.push(
            new Order(order.name, 
              order.phone, 
              order.advertId, 
              order.done, 
              key)
          )
        })
        commit('createOrder', resultOrders)
        commit('setLoad', false)
      } catch (error) {
        commit('setLoad', false)
        commit('setErr', error.message)
      }
    },
    async markOrder({commit, getters}, payload) {
      commit('resetErr')

      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setErr', error.message)
        throw error
      }
    } 
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(order => order.done)
    },
    updoneOrders(state) {
      return state.orders.filter(order => !order.done)
    },
    orders(state, getters) {
      return getters.updoneOrders.concat(getters.doneOrders)
    }
  }
}