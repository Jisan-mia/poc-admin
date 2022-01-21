import { notificationsMutationTypes } from "./notifications.mutationTypes"


const state = {
  notifications: []
}

let nextId = 1

const mutations = {
  [notificationsMutationTypes.PUSH](state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++ 
    })
  },
  
  [notificationsMutationTypes.DELETE](state, notificationToRemove) {
    state.notifications = state.notifications.filter(notification => notification.id !== notificationToRemove.id)
  }
}

const actions = {
   add({commit}, notification) {
     commit(notificationsMutationTypes.PUSH, notification)
   },
   remove({commit}, notificationToRemove) {
    commit(notificationsMutationTypes.DELETE, notificationToRemove)
  }
}


export const notifications = {
  namespaced: true,
  state,
  mutations,
  actions
}