import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

// here is where all the blog-data is being stored

export const store = new Vuex.Store({
  state: {
    loadedBlogs: [
      {
        id: 'blog001',
        date: new Date(),
        title: 'Winter is Coming',
        intro: 'Cold times are coming. Prepare yourself for the coldest winter',
        content: 'This is the whole text',
        imageURL: 'http://www.successignited.com/wp-content/uploads/2015/01/Winter-of-Solitude-1-1024x682.jpg'
      },
      {
        id: 'blog002',
        date: '2018-12-7',
        title: 'NewYork on a Rainy Day',
        intro: 'It was a rainy day today in NYC. I could feel the big rain-drops on my hair',
        content: 'This is the whole text',
        imageURL: 'https://i.pinimg.com/originals/5d/65/84/5d65844ebb27abac13d0bc06097b4474.jpg'
      }
    ],
    // authenticated user
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    // Using mutations to change state in Vuex.Store for each newly created blog
    // I used payload to pass multiple (additional) arguments to commit (seen under 'actions' below). Payload is an object which contains multiple fields (the blog attributes)
    createBlog (state, payload) {
      state.loadedBlogs.push(payload)
    },
    // get the user from firebase DB and overwrite the data to SET this user
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  // we use actions to commit the mutations above. In our case we use payload, since we need to pass multiple arguments (blog attributes)
  // extracting the properties & mapping these arguments (of payload) in another object for a more robust way of developing and reusability of code. That way we can chose which properties we actually want to pass
  actions: {
    createBlog ({commit}, payload) {
      const blog = {
        title: payload.title,
        content: payload.content,
        intro: payload.intro,
        imageURL: payload.imageURL,
        date: payload.date,
        id: 'blog003' // dit moet straks weg.
      }
      // here comes firebase with ID
      commit('createBlog', blog)
      // commit the payload (blog) to push to the loadedBlogs array (under mutations). The getters will then get the updated version of loadedBlogs array
    },
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
        .catch(error => {
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
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    // all blogs visualized, sorted by date
    loadedBlogs (state) {
      return state.loadedBlogs.sort((blogA, blogB) => {
        return blogA.date > blogB.date
      })
    },
    // showing only 4 blogs
    featuredBlogs (state, getters) {
      return getters.loadedBlogs.slice(0, 3)
    },
    // shows only the blog with the chosen blogID, which is used in /blogs after clicking on a block
    loadedBlog (state) {
      return (blogId) => {
        return state.loadedBlogs.find((blog) => {
          return blog.id === blogId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
