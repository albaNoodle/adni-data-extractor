const state = () => ({})

export const getters = {}

const mutations = {}

const actions = {
  async getAdniData({ commit }, { patientsPtids, phenotypes }) {
    try {
      // return this.$axios.$get(`/api/adni-reader?patientsPtids[]=${patientsPtids}&phenotypes[]=${phenotypes}`, {
      //   responseType: 'blob',
      //   headers: { Accept: 'text/csv; */*' },
      // })
      return this.$axios.$post(`/api/adni-reader`,  { patientsPtids, phenotypes }, {
          responseType: 'blob',
          headers: { Accept: 'text/csv; */*' },
        })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export default { state, mutations, actions, getters }
