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
import EditBlog from './components/blog/EditBlog'

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
Vue.component('app-edit-blog-dialog', EditBlog)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App),
  created () {
    // firebase tokens
    firebase.initializeApp({
      apiKey: 'AIzaSyDBeKw1ZAFNFWCyFJ3uIKt13D45oS3OYmI',
      authDomain: 'accessibilitypoc-2bbce.firebaseapp.com',
      databaseURL: 'https://accessibilitypoc-2bbce.firebaseio.com',
      projectId: 'accessibilitypoc-2bbce',
      storageBucket: ''
    })
    // firebase checks for a valid user-token (localStorage) at startup
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // if user has ever been logged in on this PC [which has the token saved in local storage] -> user will be automatically logged in
        this.$store.dispatch('autoLogIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadBlogs')
  }
})
