export default {
  namespaced: true,
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    clearError({
      commit
    }) {
      commit('clearError')
    },
    setError({
      commit
    }, payload) {
      commit('setError', payload)
    },
    setLoading({
      commit
    }, payload) {
      commit('setLoading', payload)
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
}