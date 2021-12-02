const state = () => ({})

export const getters = {}

const mutations = {
  RESET(currentState) {
    Object.assign(currentState, state())
  },
}

const actions = {
  async uploadPatients({ commit }, { fileDemog, fileVisits }) {
    try {
      const formData = new FormData()
      formData.append('fileVisits', fileVisits)
      formData.append('fileDemog', fileDemog)
      await this.$axios.$post('/api/adni-patients', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export default { state, mutations, actions, getters }
