import * as firebase from 'firebase'

// here is where all the user-related data is being stored

export default {
  state: {
    // authenticated user
    user: null
  },
  mutations: {
    // get the user from firebase DB and overwrite the data to SET this user
    setUser (state, payload) {
      state.user = payload
    }
  },
  // we use actions to commit the mutations above. In our case we use payload, since we need to pass multiple arguments (blog attributes)
  // extracting the properties & mapping these arguments (of payload) in another object for a more robust way of developing and reusability of code. That way we can chose which properties we actually want to pass
  actions: {
    // Underwater connect to firebase-server. Send the data (email&pw) to firebase and then validate this data. Thus, check if the user is new -> create a user. If user exists -> show error that user exists
    signUpUser ({commit}, payload) {
      // trigger loading when user signing up
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      // only if user is new, with 0 blogs published, using only these 2 properties (id, publishedBlogs)
        .then(user => {
          // stop the loading when user is signed up
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            publishedBlogs: []
          }
          commit('setUser', newUser)
        })
        .catch(
          error => {
            // stop the loading when you get an error & set the error
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
    },
    logInUser ({commit}, payload) {
      // trigger loading when user signing up
      commit('setLoading', true)
      commit('clearError') // to clear previous errors
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            // stop the loading when user is signed up
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              publishedBlogs: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            // stop the loading when you get an error and visualize the error
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoLogIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, publishedBlogs: []})
    },
    // remove localStorage token from the browser when user clicks "Log Out"
    signOut ({commit}) {
      firebase.auth().signOut()
      // firebase.database().goOffline()
      commit('setUser', null)
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/blogs/' + getters.user.id).once('value')
        .then(data => {
          const values = data.val()
          // let publishedBlogs = []
          console.log(values)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
