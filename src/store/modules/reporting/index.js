import reportingApi from "../../../api/reportingApi"
import { reportingMutationsTypes } from "./reporting.mutationTypes"

const state = {
  reportings: [],
  specificReportings: [],
  studentWiseReportings: null,
}

const mutations = {
  [reportingMutationsTypes.LOAD_STUDENT_REPORTING](state, payload) {
    state.reportings = payload
    //console.log(state)
  },
  [reportingMutationsTypes.LOAD_SPECIFIC_REPORTING](state, payload) {
    state.specificReportings = payload;
    //console.log(state)
  },
  setOnlyReportings(state, payload) {
    state.studentWiseReportings = payload
  }
}

const actions = {
  async loadAdminReporting(context) {
    const res = await reportingApi.getAdminReporting();
    // console.log(res)
    const data = await res.data;

    if(data) {
      // console.log(context.rootState.examPackState.examLists, data)

      const reportings = [...data];
      const examLists = context.rootState.examPackState.examLists;
      if(context.rootState.examPackState.examLists.length !== 0 && reportings.length !== 0) {
        
        
        // SET ONLY REPORTINGS
        const onlyReportings = {}
        reportings.forEach(report => {
          const reportExam = examLists.find(exam => exam.id == report.exam_name)

          if(onlyReportings[report.student]) {
            onlyReportings[report.student] = [
              ...onlyReportings[report.student],
              {
                ...report,
                ...reportExam
              }
            ]
          } else {
            onlyReportings[report.student] = [
              {
                ...report,
                ...reportExam
              }
            ]
          }
        })
        // console.log(onlyReportings)
        context.commit('setOnlyReportings', onlyReportings)



        const reportingExamIdsD = reportings.map(r => r.exam_name);
        // without exam name duplicates
        const reportingExamIds = [...new Set(reportingExamIdsD)]
        // console.log(reportingExamIds)

        const examsWithReport = examLists.map(exam => {
          if(reportingExamIds.indexOf(exam.id) != -1) {
            const particularExamReport = reportings.filter(r => r.exam_name == exam.id);
            const theHighestOne = particularExamReport.reduce((a, b) => Math.max(a, Number(b.score)), 0);

            const aMark = particularExamReport.map(report => {
              return (Number(report.score)/Number(exam.total_mark)) * 100
            })
            const allPercentageSum = aMark.reduce((acc, currentAverage) => acc + currentAverage, 0);

            const mainAverage = (allPercentageSum/aMark.length)




            return {
              ...exam,
              averageP: mainAverage,
              highestMark: theHighestOne,
              particularExamReport: particularExamReport
            }
          } else {
            return false;
          }
        }).filter(Boolean)
        // console.log(examsWithReport)



        context.commit(reportingMutationsTypes.LOAD_STUDENT_REPORTING, examsWithReport);
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
      if(data.length === 0) {
        context.commit(reportingMutationsTypes.LOAD_SPECIFIC_REPORTING, []);
        return;

      }
      const specificReportsData = data;
      const studentList = context.rootState.adminState.studentList;
      
      
      if(context.rootState.adminState.studentList.length !== 0 && specificReportsData.length !== 0) {
        
        //console.log(specificReportsData, studentList)

        const specificReportsUserIds = specificReportsData.map(s => s.student);

        const specificReports = studentList.map(student => {
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