import { setItemsReadonly } from "~/utils/utils.vue"

const CACHE_EXPIRATION_MS = 5 * 60 * 1000 

const state = () => ({
  patients: [],
  cacheTimes: {},
})

export const getters = {}

const mutations = {
  RESET(currentState) {
    Object.assign(currentState, state())
  },

  SET_PATIENTS(state, { collection }) {
    state.cacheTimes.patients = +new Date()
    state.patients = collection
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

  async getPatients({ commit, dispatch, state }, { rid }) {
    try {
      const cached = cachedPatients(state, { rid })
      if (cached) {
        return cached
      }
      const collection = await dispatch('loadPatients', {  })
      commit('SET_PATIENTS', { collection })
      return collection
    } catch (error) {
      console.error(error)
      handleError(commit, error)
      throw error
    }
  },

  async loadPatients({ commit }, {  }) {
    // load without cache
    try {
      // const params = { limit: limit, cursorId: cursorId }
      const collection = await this.$axios.$get(`/api/adni-patients`, {  })
      if (collection) {
        // request not aborted
        // collection.forEach((item) => processPatientFromApi(item))
        setItemsReadonly(collection) // the professional is not modifiying these items
      }
      return collection.filter((x)=> x.ptid)
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

const handleError = (commit, error) => {
  let message = error.message || error.info.error_description
  if (message.join) {
    message = message.join(', ')
  }
  commit('SET_ERROR', message)
  return message
}

const cachedPatients = (state, {rid}) => {
  if (isExpired(state.cacheTimes.patients)) {
    return undefined
  }
  const collection = state.patients
  const resource = collection[0]
  if (resource && resource?.rid === rid) {
    return collection
  } else {
    return undefined
  }
}

const isExpired = (cacheStoredAt) => {
  if (!cacheStoredAt) return true
  return +new Date() > +cacheStoredAt + CACHE_EXPIRATION_MS
}

// const processPatientFromApi = (resource) => {
//   if (!resource) {
//     return resource
//   }

//   // convert dates
//   if (resource.createdAt) {
//     resource.createdAt = parseIsoDate(resource.createdAt)
//   }
//   if (resource.updatedAt) {
//     resource.updatedAt = parseIsoDate(resource.updatedAt)
//   }
//   if (resource.happenedAt) {
//     resource.happenedAt = parseIsoDateUtcOrLocal(`${resource.happenedAt}`)
//   }

//   if (resource.record) {
//     switch (resource.type) {
//       case 'HighPain':
//         resource.record = processPainRecordFromApi(resource.record)
//         break
//     }
//   }

//   // mapIcons -> use the icon from tracking
//   resource.icon = iconRedForFlag(resource)

//   return resource
// }
