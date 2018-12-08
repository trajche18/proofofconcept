import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import {store} from './store/index'
import DateFilter from './filters/date'
import Alerts from './components/alerts/Alert'

Vue.use(Vuetify, {
  theme: {
    primary: colors.lightGreen.lighten1,
    secondary: colors.pink.darken3,
    accent: colors.shades.black,
    error: colors.red.accent3,
    dateColor: colors.grey.darken3
  }
})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alerts)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App),
  created () {
    // the tokens vary from account
    firebase.initializeApp({
      apiKey: 'AIzaSyDkGKQJOTn9epJn_yA9W0B1NIj_Wi3ho1w',
      authDomain: 'accessibilitypoc.firebaseapp.com',
      databaseURL: 'https://accessibilitypoc.firebaseio.com',
      projectId: 'accessibilitypoc',
      storageBucket: ''
    })
    this.$store.dispatch('loadBlogs')
    // firebase checks for a valid user-token (localStorage) at startup
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // if user has ever been logged in on this PC [which has the token saved in local storage] -> user will be automatically logged in
        this.$store.dispatch('autoLogIn', user)
      }
    })
  }
})
