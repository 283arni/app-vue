import * as fb from 'firebase'

class Ad {
  constructor(title, description, ownerId, imageSrc = '', promo = false, id = null) {    
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    slids: []
  },
  mutations: {
    newAdvert(state, payload) {
      state.slids.push(payload)
    },
    loadAdverts(state, payload) {
      state.slids = payload
    },
    updateAd(state, {title, description, id}) {
      const ad = state.slids.find(a => {
        return a.id === id
      })

      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async newAdvert({commit, getters}, payload) {
      commit('resetErr')
      commit('setLoad', true)

      const image = payload.image

      try {
        const newAd = new Ad( 
          payload.title, 
          payload.description, 
          getters.user.id, 
          '', 
          payload.promo
          )
        const ad = await fb.database().ref('adverts').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        const fileData = await fb.storage().ref(`adverts/${ad.key}.${imageExt}`).put(image)

        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()

        await fb.database().ref('adverts').child(ad.key).update({
          imageSrc
        })

        commit('setLoad', false)
        commit('newAdvert', {
          ...newAd,
          id: ad.key,
          imageSrc
        })
      } catch (error) {
        commit('setErr', error.message)
        commit('setLoad', false)
        throw error
      }
    },
    async getAdverts({commit}) {
      commit('resetErr')
      commit('setLoad', true)

      const resultAds = []

      try {
        const fbVal = await fb.database().ref('adverts').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(ad.title, 
              ad.description, 
              ad.ownerId, 
              ad.imageSrc, 
              ad.promo,
              key)
          )
        })
        commit('loadAdverts', resultAds)
        commit('setLoad', false)
      } catch (error) {
        commit('setErr', error.message)
        commit('setLoad', false)
      }
    },
    async updateAd({commit}, {title, description, id}) {
      commit('resetErr')
      commit('setLoad', true)

      try {
        await fb.database().ref('adverts').child(id).update({
          title,
          description
        })
        commit('updateAd', {
          title, description, id
        })
        commit('setLoad', false)
      } catch (error) {
        commit('setErr', error.message)
        commit('setLoad', false)
      }
    }
  },
  getters: {
    slids(state) {
      return state.slids
    },
    promoSlid(state) {
      return state.slids.filter(slid => {
        return slid.promo
      })
    },
    myAds(state, getters) {
      return state.slids.filter(slid => {
        return slid.ownerId === getters.user.id
      })
    },
    advertById(state) {
      return advertId => {
        return state.slids.find(slid => slid.id === advertId)
      }
    } 
  }
}