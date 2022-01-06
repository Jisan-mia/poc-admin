
import axios from 'axios'
import { counter2MutationTypes } from './counter2.mutationTypes'
const state = {
  counter2: 1,
}
const mutations = {
  [counter2MutationTypes.ADD_COUNTER](state) {
    state.counter2 = state.counter2 + 1
  },
  [counter2MutationTypes.REMOVE_COUNTER](state) {
    state.counter2 = state.counter2 - 1
  }
}

const actions = {
  async addCounter(context, payload) {
    setTimeout(() => {
      context.commit(counter2MutationTypes.ADD_COUNTER)
    }, 2000);
  },
  async removeCounter(context, payload) {
    setTimeout(() => {
      context.commit(counter2MutationTypes.REMOVE_COUNTER)
    }, 2000);
  }
}

export const counter2 = {
  namespaced: true,
  state,
  mutations,
  actions,
}
