import { getNotification } from "../../../api/common";
import userApi from "../../../api/userApi";
import { userMutationTypes } from "./user.mutationTypes";

const state = {
  user: {
    phone_number: '',
    password: '',
    userId: 0,

    user:'', // same as phone_number
    image: '',
    name:"",
    email:'',
    level:'',
    batch:'',
    board:'',
    institution:'',
    token: '',
    isAuthenticated: false
  }, 
  profile: null,
  allStudentList: null,
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
  setAllStudent(state, allStudent) {
    state.allStudentList = allStudent;
  },
  [userMutationTypes.SET_USER](state, payload) {
    state.user = {...state.user, ...payload }
    //console.log(state)
  }
}

const actions = {
  async registerByPhonePass(context, payload) {
    const res = await userApi.registerUserByPhonePass(payload);
    //console.log(res)
    const data = await res.data;
    if(data) {
      context.commit(userMutationTypes.SET_USER , data)
      
      // try{
      //   await context.dispatch('userLogin', data)
      // } catch(err) {
      //   throw Error(err);
      // }
    } else {
      context.commit(userMutationTypes.SET_USER , {
        phone_number: '',
        password: ''
      })
      const notification = {
        type: 'error',
        message: 'Already Have an account'
      }

      context.dispatch('notifications/add', notification , {root: true})
      
      throw new Error('could not complete register')
    }
  },
  async userLogin(context, payload) {
    const res = await userApi.handleUserLogin(payload);
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
  async registerStudent(context, payload) {
    const res = await userApi.registerStudentApi(payload);
    //console.log(res)


    if(res.data) {
      //console.log(res.data)
      context.dispatch('notifications/add', getNotification('success', 'Successfully Registered'), {root: true})
    } else {
      const notification = {
        type: 'error',
        message: 'Error registering user profile'
      }

      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('Error registering user profile')
    }
  },
  async loadUserProfile(context) {
    const res = await userApi.getAllStudentList();
    // console.log(res)

    const data = await res.data
    if(data) {
      context.commit('setAllStudent', data)
      const userId = context.state.user.userId
      console.log(userId)
      const profile = data.find(profile => profile.user == userId)
      context.commit('setProfile', profile)

    } else {
      const notification = {
        type: 'error',
        message: 'Error getting student profile'
      }

      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('Error getting student profile')
    }
  },

  async updateStudentProfile (context, profile) {
    const mainProfile = {...profile}
    if(!mainProfile.Profile_image || typeof mainProfile.Profile_image == 'string') {
      // console.log(mainProfile.Profile_image)
      delete mainProfile.Profile_image
    }
    const res = await userApi.updateUserProfile(mainProfile)
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

  async setNewPassword(context, payload){
    const res = await userApi.setNewPassword(payload)
    if(res.data) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Password Changed'} , {root: true})
    } else {
      const notification = {
        type: 'error',
        message: 'Error updating changing password'
      }

      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('Error changing password')

    }
  }

}


const getters = {

}

export const user = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}