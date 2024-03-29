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
  },
  studentList: [],
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
  setAllStudent(state, studentLists) {
    state.studentList = studentLists
  }
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
        message: "You've not access to this"
      }

      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('could not login user')
    }
  },

  async loadStudentList(context) {
    const res = await adminApi.getAllStudentList();
    const adminStuRes = await adminApi.getAdminStudent();

    const data = await res?.data
    const adminStuData = await adminStuRes?.data
    if(data && adminStuData) {

      if(data.length !== 0 && adminStuData.length !== 0) {
        const adminStuIds = adminStuData.map(stu => stu.user)

        const allMainStu = data.map(student => {
          if(adminStuIds.indexOf(student.user) != -1) {
            const findAdminStu = adminStuData.find(stu => stu.user == student.user);
            return {
              ...student,
              is_block: findAdminStu.is_block,
              phone_number: findAdminStu.phone_number
            }
          } else {
            return false
          }
        }).filter(Boolean)

        context.commit('setAllStudent', allMainStu)
      }

    } else {
      const notification = {
        type: 'error',
        message: 'Error getting student lists'
      }

      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('Error getting student lists')
    }
  },
  

  async blockAStudent(context, student) {
    const data = {
      phone_number: student.phone_number,
      block_status: student.is_block == true ? 'True' : 'False'
    }

    const res = await adminApi.blockStudent(data);
    // console.log(res)

    const message = await res.message
    if(message) {
      if(student.is_block) {
        context.dispatch('notifications/add', {type: 'success', message: 'Successfully Blocked'} , {root: true})
      } else {
        context.dispatch('notifications/add', {type: 'success', message: 'Successfully UnBlocked'} , {root: true})
      }

    } else {
      const notification = {
        type: 'error',
        message: 'Error blocking student'
      }

      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('Error blocking student')
    }
  },
  async deleteAStudent(context, payload) {
    const res = await adminApi.deleteStudent(payload);
    // console.log(res)

    const data = await res.code;
    if(data == 200) {
      context.dispatch('loadStudentList')
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Deleted'} , {root: true})
    } else {
      const notification = {
        type: 'error',
        message: 'Error deleting student'
      }
      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('Error deleting student')
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