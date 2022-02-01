import axios from 'axios'
import batchSettingsApi from './batchSettingsApi'
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
    const res = await batchSettingsApi.getBatchSettings();
    const data = await res?.data;
    console.log(res)
    if(data) {
      const batches = data.filter(item => item.batch)
      const levels = data.filter(item => item.level)
      const boards = data.filter(item => item.board)
      
      context.commit('setBatchOptions', batches)
      context.commit('setLevelOptions', levels)
      context.commit('setBoardOptions', boards)
    }
    
  },
  async addItemToBatchSettings(context, payload) {
    const res = await batchSettingsApi.addBatchSettings(payload)
    const data = await res?.data;
    if(data) {
      // try {
      //   await context.dispatch('loadBatchSettings')
      // } catch(err) {
      //   console.log(err)
      // }
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Added'} , {root: true})

    } else {
      const notification = {
        type: 'error',
        message: 'Error adding batch'
      }
      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('Error adding batch')
    }
  },
  async deleteItemFromBatchSettings(context, id) {
    
    const res = await batchSettingsApi.deleteBatchSettings(id)
    console.log(res)
    const resCode = await res.status;
    if(resCode == 202){
      
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully deleted'} , {root: true})
    } else {
      const notification = {
        type: 'error',
        message: 'Error deleting batch'
      }
      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('Error deleting batch')
    }

  }
}


export const batchSettings = {
  namespaced: true,
  state,
  mutations,
  actions
}