import Vue from 'vue'
import Vuex from 'vuex'

import blog from './blog'
import user from './user'
import alerts from './alerts'

Vue.use(Vuex)

// here are all the needed JS-objects (blog,user, alerts) imported, for a more cleaner & reusable code

export const store = new Vuex.Store({
  modules: {
    blog: blog,
    user: user,
    alerts: alerts
  }
})
