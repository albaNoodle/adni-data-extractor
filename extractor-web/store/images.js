const state = () => ({})

export const getters = {}

const mutations = {
  RESET(currentState) {
    Object.assign(currentState, state())
  },
}

const actions = {
  async uploadImages({ commit }, { file }) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const user = await this.$axios.$post('/api/adni-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export default { state, mutations, actions, getters }
