import reportingApi from "../../../api/reportingApi"
import { reportingMutationsTypes } from "./reporting.mutationTypes"

const state = {
  reportings: [],
  specificReportings: [],
}

const mutations = {
  [reportingMutationsTypes.LOAD_STUDENT_REPORTING](state, payload) {
    state.reportings = payload
    //console.log(state)
  },
  [reportingMutationsTypes.LOAD_SPECIFIC_REPORTING](state, payload) {
    state.specificReportings = payload;
    //console.log(state)
  }
}

const actions = {
  async loadStudentReporting(context) {
    const res = await reportingApi.getStudentReporting();
    // console.log(res)
    const data = await res.data;

    if(data) {
      //console.log(context.rootState.examPackState.examLists, data)

      const reportings = data;
      const examLists = context.rootState.examPackState.examLists;
      if(context.rootState.examPackState.examLists.length !== 0 && reportings.length !== 0) {
        const reportingExamIds = reportings.map(r => r.exam_name);
        // console.log(reportingExamIds)

        const examReports = examLists.map(exam => {
          if(reportingExamIds.indexOf(exam.id) != -1) {
            const report = reportings.filter(r => r.exam_name == exam.id)
            const mainReport = Object.assign({}, report)[0]
            delete mainReport.id
            // console.log(mainReport.value)
              return {
                ...exam,
                ...mainReport,
              }
          } else {
            return false;
          }
        }).filter(Boolean)
        // console.log(examReports)
        context.commit(reportingMutationsTypes.LOAD_STUDENT_REPORTING, examReports);
      }

    } else {
      const notification = {
        type: 'error',
        message: 'Error getting student reporting'
      }

      context.dispatch('notifications/add', notification , {root: true})
      
      throw new Error('could not get student reporting')
    }
  },
  async loadSpecificReports(context, exam_name) {
    console.log(exam_name)
    const res = await reportingApi.getSpecificReporting(exam_name);
    //console.log(res);
    const data = await res.data;

    if(data) {
      const specificReportsData = data;
      const allStudentList = context.rootState.userState.allStudentList;
      
      
      if(context.rootState.userState.allStudentList.length !== 0 && specificReportsData.length !== 0) {
        
        //console.log(specificReportsData, allStudentList)

        const specificReportsUserIds = specificReportsData.map(s => s.student);

        const specificReports = allStudentList.map(student => {
          if(specificReportsUserIds.indexOf(student.user) != -1) {
            const sReport = specificReportsData.filter(sR => sR.student == student.user);
            const mainSReport = Object.assign({}, sReport)[0];
            delete mainSReport.id;
            return {
              ...student,
              ...mainSReport
            }
            
          } else {
            return false
          }
        }).filter(Boolean)
        context.commit(reportingMutationsTypes.LOAD_SPECIFIC_REPORTING, specificReports)
      }

    } else {
      const notification = {
        type: 'error',
        message: 'Error getting specific report'
      }

      context.dispatch('notifications/add', notification , {root: true})
      
      throw new Error('could not get specific report');
    }
  }

}


export const reporting = {
  namespaced: true,
  state,
  mutations,
  actions
}