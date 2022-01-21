import { createStore } from 'vuex'
import { counter } from './modules/counter';
import { counter2 } from './modules/counter2';
import { user } from './modules/user';
import { notifications } from './modules/notifications'
import { examPack } from './modules/examPack'
import { reporting } from './modules/reporting'
import {examResult} from './modules/examResult'
import { admin } from './modules/admin';

export default createStore({
  state: {
    isLoading: false
  },
  mutations: {
    setIsLoading(state, status) {
      state.isLoading = status
    },
  },
  modules: {
    counter1: counter,
    counter2: counter2,
    userState: user,
    notifications: notifications,
    examPackState: examPack,
    reportingState: reporting,
    examResult: examResult,
    adminState: admin
  }
})
