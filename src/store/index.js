import Vue from 'vue';
import Vuex from 'vuex';
import adverts from './adverts'
import user from './user'
import common from './common'
import orders from './orders'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    adverts,
    user,
    common,
    orders
  }
})