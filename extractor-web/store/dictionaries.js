import { setItemsReadonly } from "~/utils/utils.vue"

const CACHE_EXPIRATION_MS = 5 * 60 * 1000 

const state = () => ({
  brainParts: [],
  cacheTimes: {},
})

export const getters = {}

const mutations = {
  RESET(currentState) {
    Object.assign(currentState, state())
  },

  SET_BRAIN_PARTS(state, { collection }) {
    state.cacheTimes.brainParts = +new Date()
    state.brainParts = collection
  },
}

const actions = {
  async uploadDictionary({ commit }, { file }) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      await this.$axios.$post('/api/adni-dictionaries', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  async getBrainParts({ commit, dispatch, state }) {
    try {
      const cached = cachedBrainParts(state)
      if (cached) {
        return cached
      }
      const collection = await dispatch('loadBrainParts')
      commit('SET_BRAIN_PARTS', { collection })
      return collection
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  async loadBrainParts({ commit }) {
    // load without cache
    try {
      const collection = await this.$axios.$get('/api/adni-dictionaries')
      if (collection) {
        // request not aborted
        // collection.forEach((item) => processRedFlagFromApi(item))
        setItemsReadonly(collection) // the professional is not modifiying these items
      }
      return collection
    } catch (error) {
      console.error(error)
      handleError(commit, error)
      throw error
    }
  },
}

export default { state, mutations, actions, getters }

// ===
// Utils
// ===

const cachedBrainParts = (state) => {
  if (isExpired(state.cacheTimes.brainParts)) {
    return undefined
  }
}

const isExpired = (cacheStoredAt) => {
  if (!cacheStoredAt) return true
  return +new Date() > +cacheStoredAt + CACHE_EXPIRATION_MS
}
