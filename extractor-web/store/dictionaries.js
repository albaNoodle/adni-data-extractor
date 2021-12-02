const state = () => ({})

export const getters = {}

const mutations = {
  RESET(currentState) {
    Object.assign(currentState, state())
  },
}

const actions = {
  async uploadDictionary({ commit }, { file }) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const user = await this.$axios.$post('/api/adni-dictionaries', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export default { state, mutations, actions, getters }
