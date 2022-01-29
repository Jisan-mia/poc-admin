import axios from 'axios'
const state = {
  batchOptions: [],
  levelOptions: [],
  boardOptions: []

}
const mutations = {
  setBatchOptions(state, payload) {
    state.batchOptions = payload
  },
  setLevelOptions(state, payload) {
    state.levelOptions = payload
  },
  setBoardOptions(state, payload) {
    state.boardOptions = payload
  }
}

const actions = {
  async loadBatchSettings(context) {

  },
  async addItemToBatchSettings(context) {
     
  },
  async deleteItemFromBatchSettings(context, payload) {
    
  }
}



export const batchSettings = {
  namespaced: true,
  state,
  mutations,
  actions
}