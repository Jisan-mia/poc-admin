import adminApi from "../../../api/adminApi";
import { getNotification } from "../../../api/common";

const state = {
  user: {
    phone_number: '',
    password: '',
    userId: 0,
    // user:'', // same as phone_number
    // image: '',
    name:"",
    token: '',
    isAuthenticated: false
  }
}

const mutations = {
  initializeStore(state) {
    if(localStorage.getItem('token')) {
      state.user.token = localStorage.getItem('token');
      state.user.isAuthenticated = true;
      state.user.userId = localStorage.getItem('userId');
    } else {
      state.user.token = ''
      state.user.isAuthenticated = false
      state.user.userId = 0;
    }
  },
  setUserId(state, userId) {
    state.user.userId = userId
  },
  setToken(state, token) {
    state.user.token = token
    state.user.isAuthenticated = true
  },
  removeToken(state) {
    state.user.token = ''
    state.user.isAuthenticated = false
  },
  setProfile(state, profile) {
    state.profile = profile;
    //console.log(state.profile)
  },
}

const actions = {
  
  async userLogin(context, payload) {
    const res = await adminApi.handleUserLogin(payload);
    console.log(res)

    const data = await res.data;

    if(data?.access_token) {
      const token = data.access_token;
      const userId = data.user_id
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      context.commit('setToken', token);
      context.commit('setUserId', userId);


    } else {
      const notification = {
        type: 'error',
        message: 'No user found'
      }

      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('could not login user')
    }
  },
  
  async updateAdminProfile (context, profile) {
    const mainProfile = {...profile}
    if(!mainProfile.Profile_image || typeof mainProfile.Profile_image == 'string') {
      // console.log(mainProfile.Profile_image)
      delete mainProfile.Profile_image
    }
    const res = await adminApi.updateUserProfile(mainProfile)
    const data = await res.payload;

    if(data) {
      context.commit('setProfile', data)
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Updated'} , {root: true})
    }else {
      const notification = {
        type: 'error',
        message: 'Error updating student profile'
      }
      context.dispatch('notifications/add', notification , {root: true})
    }
  },
}



export const admin = {
  namespaced: true,
  state,
  mutations,
  actions,
}