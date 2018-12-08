import {store} from '../store'

export default (to, from, next) => {
  // check if there is an existing user in firebase (from store/index.js). Redirect him to the URL the user clicked on (in that moment) OR to /login if he is not authenticated yet
  if (store.getters.user) {
    next()
  } else {
    next('/login')
  }
}
