// here is where all the alert-related (error, loading-animation) data is being stored

export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
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
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
