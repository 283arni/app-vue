import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import modalBuy from './components/buy/ModalBuy'
import * as fb from 'firebase'
import router from './routes'

Vue.component('modalBuy', modalBuy)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyC5RMEkJJI_T9023l6vidmQR7VhINnDpWU",
      authDomain: "app-vue-3b657.firebaseapp.com",
      databaseURL: "https://app-vue-3b657.firebaseio.com",
      projectId: "app-vue-3b657",
      storageBucket: "app-vue-3b657.appspot.com",
      messagingSenderId: "58812494588",
      appId: "1:58812494588:web:c82a8f80c6b96b16a6dd79"
    });

    fb.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoLog', user)
      }
    });

    this.$store.dispatch('getAdverts')
  }
}).$mount('#app')
