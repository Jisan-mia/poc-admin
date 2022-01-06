import { createStore } from 'vuex'
import { counter } from './modules/counter';
import { counter2 } from './modules/counter2';
import { user } from './modules/user';

export default createStore({
  modules: {
    counter1: counter,
    counter2: counter2,
    user: user,
  }
})
