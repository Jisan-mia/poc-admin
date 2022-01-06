import { counterMutationTypes } from "./counter.mutationTypes"
import axios from 'axios'
const state = {
  counter: 1,
  history: [1],
}
const mutations = {
  [counterMutationTypes.ADD_COUNTER](state, payload) {
    state.counter = state.counter + payload
    state.history.push(state.counter)
  },
  [counterMutationTypes.REMOVE_COUNTER](state, payload) {
    state.counter = state.counter - payload
    state.history.push(state.counter)
  }
}

const actions = {
  async addRandomNumber(context, payload) {
    let data = await axios.get('https://www.random.org/integers/?num=1&min=-1000&max=1000&col=1&base=10&format=plain&rnd=new');
    context.commit(counterMutationTypes.ADD_COUNTER, data.data)
    console.log(payload.amount)
  }
}

const getters = {
  activeIndex: (state) => (payload) => {
    let indexes = [];
    state.history.forEach((number, index) =>{
      if (number == payload) {
        indexes.push(index)
      }
    })
    return indexes
  }
}

export const counter = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}