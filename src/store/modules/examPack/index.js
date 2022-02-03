import { getNotification, getDateDiff, arraysCompare } from "../../../api/common";
import examPackApi from "../../../api/examPackApi";
import reportingApi from "../../../api/reportingApi";
import { examPackMutationTypes } from "./examPack.mutationTypes";
import { v4 as uuidv4 } from 'uuid';


const state = {
  isCreateExamFromPack: false,
  examPacks: [],
  examLists: [],
  examQuestions: [],
  savedExamQuestions: []
}

const mutations = {
  [examPackMutationTypes.SET_EXAM_PACK](state, payload) {
    state.examPacks = payload
    //console.log(state)
  },
  [examPackMutationTypes.SET_EXAM_LIST](state, payload) {
    state.examLists = payload
    //console.log(state)
  },
  [examPackMutationTypes.SET_EXAM_QUESTIONS](state, payload) {
    state.examQuestions = payload
  },
  setSavedExamQuestions(state,payload) {
    state.savedExamQuestions = payload
  },
  setIsCreateExamFromPack(state, payload) {
    state.isCreateExamFromPack = payload
  }
}

const actions = {
  // exam pack related
  
  async loadExamPacks(context) {
    const res = await examPackApi.getExamPackList();
    //console.log(res)
    const data = await res.data;

    if(data) {
      context.commit(examPackMutationTypes.SET_EXAM_PACK, data)
    } else {
      const notification = {
        type: 'error',
        message: 'Error getting exam packs'
      }

      context.dispatch('notifications/add', notification , {root: true})
      
      throw new Error('could not load exam packs')
    }
  },

  async createExamPack(context, examPack) {
    const res = await examPackApi.createPack(examPack);
    const data = await res.data

    if(data) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Created'} , {root: true})
    } else {
      const notification = {
        type: 'error',
        message: 'Error creating examPack'
      }

      context.dispatch('notifications/add', notification , {root: true})    
    }
    
  },

  async updateExamPack (context, examPack) {
    const mainExamPack = {...examPack}
    if(!mainExamPack.pack_image || typeof mainExamPack.pack_image == 'string') {
      // console.log(mainExamPack.pack_image)
      delete mainExamPack.pack_image
    }
    const res = await examPackApi.updateExamPack(mainExamPack)
    const payload = await res.payload;

    if(payload) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Updated'} , {root: true})
    }else {
      const notification = {
        type: 'error',
        message: 'Error updating examPack'
      }

      context.dispatch('notifications/add', notification , {root: true})
    }
  },

  async deleteExamPack(context, packId) {
    const res = await examPackApi.deletePack(packId);
    const resCode = await res.code

    if(resCode == 200) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Deleted'} , {root: true})
    } else {
      const notification = {
        type: 'error',
        message: 'Error deleting examPack'
      }

      context.dispatch('notifications/add', notification , {root: true})    
    }
  },

  // exams related

  async loadExamLists(context) {
    const res = await examPackApi.getExamLists();
    
    const data = await res.data;


    if(data) {
      const mainExam = data.map(exam => {
        if(getDateDiff(exam.Exam_end_date, exam.Exam_end_time)) {
          return {
            ...exam,
            isExpired: true
          }
        } else if (!getDateDiff(exam.Exam_start_date, exam.Exam_start_time)) {
          return {
            ...exam,
            isNotYetStarted: true
          }
        } return exam
      })
      //console.log(mainExam)
      if(localStorage.getItem('token')) {
        context.commit(examPackMutationTypes.SET_EXAM_LIST, mainExam)
      } else {
        // 
      }

    } else {
      const notification = {
        type: 'error',
        message: 'Error getting exam lists'
      }



      context.dispatch('notifications/add', notification , {root: true})
      
      throw new Error('could not get exam lists')
    }
  },

  async createAnExam(context, exam) {
    const res = await examPackApi.createExam(exam);
    const data = await res.data;

    if(data) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Created'} , {root: true})
    } else {
      const notification = {
        type: 'error',
        message: 'Error creating examPack'
      }

      context.dispatch('notifications/add', notification , {root: true})    
    }
    
  },

  async editAnExam (context, exam) {
    const mainExam = {...exam}
    if(!mainExam.cover_photo || typeof mainExam.cover_photo == 'string') {
      // console.log(mainExam.pack_image)
      delete mainExam.cover_photo
    }
    if(mainExam.isExpired) {
      delete mainExam.isExpired
    } else if(mainExam.isNotYetStarted) {
      delete mainExam.isNotYetStarted
    }
    const res = await examPackApi.editExam(mainExam)
    console.log(res)
    const payload = await res.data;

    if(payload) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Updated'} , {root: true})
    }else {
      const notification = {
        type: 'error',
        message: 'Error updating exam'
      }

      context.dispatch('notifications/add', notification , {root: true})
    }
  },

  async deleteAnExam(context, examId) {
    const res = await examPackApi.deleteExam(examId);
    const resStatus = await res.status;

    if(resStatus == 202) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Deleted'} , {root: true})
    } else {
      const notification = {
        type: 'error',
        message: 'Error deleting exam'
      }

      context.dispatch('notifications/add', notification , {root: true})    
    }
  },







  async loadExamQuestions(context, id) {
    const examLists = context.state.examLists;
    
    // const currentExam = examLists.find(exam => exam.id == id);

    // const {isRandomized, mark_per_question, amount_per_mistake, isNegativeMarking} = currentExam;
    //console.log(isRandomized);
    

    const res = await examPackApi.getExamQuestions(id);
    const question_data = await res.question_data;

    if(question_data) {
      const allQuestion = [];
      const allQuestionThree = [];


      const setUpQuestionThree = (question) => {
        const {id, q_description, q_image, exam_pack, exam_name} = question;
        const mainThreeQuestion = {
          id,
          uuid: uuidv4(),
          isNewQuestion: false,
          type: 'Type 03',
          q_description,
          q_image,
          exam_pack,
          exam_name,
          otherQuestions: [
            {
              uuid: uuidv4(),
              type: 'Type 01',
              question_name: question.question_name,
              exam_pack,
              exam_name,
              selectedOption: '',
              isNewQuestion: false,
              options: [
                {
                  Question: question.question_name,
                  ans: question.question_one_ans_one,
                  is_correct: question.question_one_ans_one_is_correct
                },
                {
                  Question: question.question_name,
                  ans: question.question_one_ans_two,
                  is_correct: question.question_one_ans_two_is_correct
                },
                {
                  Question: question.question_name,
                  ans: question.question_one_ans_three,
                  is_correct: question.question_one_ans_three_is_correct
                },
                {
                  Question: question.question_name,
                  ans: question.question_one_ans_four,
                  is_correct: question.question_one_ans_four_is_correct
                }
              ]
            },
            {
              uuid: uuidv4(),
              type: 'Type 02',
              question_name: question.question_name_two,
              exam_pack,
              exam_name,
              selectedOption: '',
              data_one: question.sample_one,
              data_two: question.sample_two ,
              data_three: question.sample_three,
              isNewQuestion: false,
              options: [
                {
                  Question: question.question_name_two,
                  ans: question.question_two_ans_one,
                  is_correct: question.question_two_ans_one_is_correct
                },
                {
                  Question: question.question_name_two,
                  ans: question.question_two_ans_two,
                  is_correct: question.question_two_ans_two_is_correct
                },
                {
                  Question: question.question_name_two,
                  ans: question.question_two_ans_three,
                  is_correct: question.question_two_ans_three_is_correct
                },
                {
                  Question: question.question_name_two,
                  ans: question.question_two_ans_four,
                  is_correct: question.question_two_ans_four_is_correct
                }
              ]
            }
          ]

        }
        
        const questionSelectedAns = mainThreeQuestion.otherQuestions.map((q) => {
          const rightAns = q.options.find(option => option.is_correct == true);
          return {
            ...q,
            selectedOption: rightAns.ans
          }
        })

        const mainQuestionThree = {
          ...mainThreeQuestion,
          otherQuestions: questionSelectedAns
        }

        allQuestionThree.push(mainQuestionThree);
      }

      for(let key in question_data) {
        for(let i in question_data[key]) {
          if(key !== "data_three") {
            allQuestion.push({
              ...question_data[key][i],
              type: key == 'data_one' ? 'Type 01' : key == 'data_two' ? 'Type 02' : '',
              isNewQuestion: false,
              uuid: uuidv4()
            })
          } else {
            // 
            setUpQuestionThree(question_data[key][i])
          }
          
        }
      }

      

      const setQuestionOption = async (question) => {
        
        const optionRes = await examPackApi.getQuestionOptions(question.question_name);
        const optionData = await optionRes.data;
        let mainOptions = [];
        let rightAns = null;
        if(optionData) {
          //console.log(optionData)
          const mainOptionsData = optionData.map(o => {
            return {
              ...o,
              // Question: question.question_name
            }
          })

          rightAns = mainOptionsData.find(option => option.is_correct == true)
          

          const questionWithOption = {...question, options: mainOptionsData, selectedOption: rightAns.ans }
          
          return questionWithOption
          // for(let optionKey in optionData) {
          //   if(optionData[optionKey].length) {
          //     mainOptions = [...optionData[optionKey]]
          //   }
          // }
          
        }
        //console.log({...question, options: mainOptions})
      }

      const allQuestionWithOptions = await Promise.all(allQuestion.map(setQuestionOption))
      

      
      // let previousQuestions = context.state.examQuestions;
      // console.log(previousQuestions, allQuestionWithOptions)
      // const qNames = previousQuestions.map(q => q.question_name)
      // const theNewOne = allQuestionWithOptions.find(q => {
      //   if(qNames.indexOf(q.question_name) !== -1) {
      //     return q
      //   }
      // })

      // console.log(theNewOne)
      // if(theNewOne?.question_name) {
      //   const filterQ = previousQuestions.filter(q => q.question_name !== theNewOne.question_name)
      //   previousQuestions = [...filterQ, theNewOne]

      // } else {
      //   previousQuestions = [...allQuestionWithOptions]
      // }

      // const finalQuestions = [...previousQuestions]

      context.commit(examPackMutationTypes.SET_EXAM_QUESTIONS, [...allQuestionWithOptions, ...allQuestionThree])
    } else {
      const notification = {
        type: 'error',
        message: 'Error getting student exam lists'
      }

      context.dispatch('notifications/add', notification , {root: true})
      throw new Error('could not exam lists')
    }

  },


  async createQuestionTypeOne(context, payload) {
    const {exam_name, exam_pack, q_image, question_name} = payload;
    const allOptions = payload.options

    const data = {
      exam_name, 
      exam_pack, 
      q_image, 
      question_name
    }

  
    const res = await examPackApi.createQuestionOneTwo(data, 'https://www.exam.poc.ac/api/create_q_one/');
    const resData = await res.data;
    if(resData) {
      const qId = resData.id;
      const allMainOptions = allOptions.map(option => {
        return {
          ...option,
          Question: qId
        }
      })
      
      allMainOptions.forEach(async (option) => {
        await examPackApi.createQuestionOneTwoOption(option, `https://www.exam.poc.ac/api/ans_type_one/`)
      })

      const allQuestion = context.state.examQuestions;
      const upd = allQuestion.map(q => q.uuid == payload.uuid ? {...q, ...payload, isNewQuestion: false} : q)
      context.commit(examPackMutationTypes.SET_EXAM_QUESTIONS,upd)






      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Created'} , {root: true})

    } else {
      throw new Error('could not create question type one')

    }

  },

  async createQuestionTypeTwo(context, payload) {
    const data = {
      exam_pack: payload?.exam_pack,
      exam_name: payload?.exam_name,
      description: payload?.description,
      question_name: payload?.question_name,
      Q_image: payload?.Q_image,
      data_one: payload?.data_one,
      data_two: payload?.data_two,
      data_three: payload?.data_three,
      data_four: payload?.data_four
    }
    const allOptions = payload.options


    const res = await examPackApi.createQuestionOneTwo(data, 'https://www.exam.poc.ac/api/create_q_two/');
    const resData = await res.data;
    if(resData) {
      const qId = resData.id;
      const allMainOptions = allOptions.map(option => {
        return {
          ...option,
          Question: qId
        }
      })
      
      allMainOptions.forEach(async (option) => {
        await examPackApi.createQuestionOneTwoOption(option, `https://www.exam.poc.ac/api/ans_type_two/`)
      })
      const allQuestion = context.state.examQuestions;
      const upd = allQuestion.map(q => q.uuid == payload.uuid ? {...q, ...payload, isNewQuestion: false} : q)
      context.commit(examPackMutationTypes.SET_EXAM_QUESTIONS,upd)

      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Created'} , {root: true})

    } else {
      throw new Error('could not create question type two')
    }
    
  },

  async createQuestionTypeThree(context, payload) {
    console.log(payload)
    const {q_description, q_image, exam_pack, exam_name} = payload;

    const mainData = {
      exam_pack, 
      exam_name,
      q_description, 
      q_image, 
      question_name: payload.question1?.question_name,
      question_one_ans_one: payload.question1?.options[0].ans,
      question_one_ans_one_is_correct: payload.question1?.options[0].is_correct,
      question_one_ans_two: payload.question1?.options[1].ans,
      question_one_ans_two_is_correct: payload.question1?.options[1].is_correct,
      question_one_ans_three: payload.question1?.options[2].ans,
      question_one_ans_three_is_correct: payload.question1?.options[2].is_correct,
      question_one_ans_four: payload.question1?.options[3].ans,
      question_one_ans_four_is_correct: payload.question1?.options[3].is_correct,

      question_name_two:  payload.question2.question_name,
      sample_one: payload.question2?.data_one,
      sample_two: payload.question2?.data_two,
      sample_three: payload.question2?.data_three,
      question_two_ans_one: payload.question2?.options[0].ans,
      question_two_ans_one_is_correct: payload.question2?.options[0].is_correct,
      question_two_ans_two: payload.question2?.options[1].ans,
      question_two_ans_two_is_correct: payload.question2?.options[1].is_correct,
      question_two_ans_three: payload.question2?.options[2].ans,
      question_two_ans_three_is_correct: payload.question2?.options[2].is_correct,
      question_two_ans_four: payload.question2?.options[3].ans,
      question_two_ans_four_is_correct: payload.question2?.options[3].is_correct,
    }


    const res = await examPackApi.createQuestionOneTwo(mainData, 'https://www.exam.poc.ac/api/create_q_three/');
    console.log(res)
    const resData = await res?.data;
    if(resData) {
      const allQuestion = context.state.examQuestions;
      const upd = allQuestion.map(q => q.uuid == payload.uuid ? {...q, ...payload, isNewQuestion: false} : q)
      context.commit(examPackMutationTypes.SET_EXAM_QUESTIONS,upd)
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Created'} , {root: true})
    } else {
      throw new Error('could not create question type three')
    }

    console.log(mainData)
  },


  async deleteQuestionTypeOne(context, questionId) {
    const res = await examPackApi.deleteQuestionOneTwo(`https://www.exam.poc.ac/api/delete_question_one/${questionId}`)
    
    const resCode = await res?.code
    if(resCode == 200) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Deleted'} , {root: true})
    } else {
      context.dispatch('notifications/add', {type: 'error', message: 'Failed to Delete'} , {root: true})
      throw new Error('could not delete question model one')

    }
  },

  async deleteQuestionTypeTwo(context, questionId) {
    const res = await examPackApi.deleteQuestionOneTwo(`https://www.exam.poc.ac/api/delete_question_two/${questionId}`)
    
    const resCode = await res?.code
    if(resCode == 200) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Deleted'} , {root: true})
    } else {
      context.dispatch('notifications/add', {type: 'error', message: 'Failed to Delete'} , {root: true})
      throw new Error('could not delete question model two')

    }
  },

  async deleteQuestionTypeThree(context, questionId) {
    const res = await examPackApi.deleteQuestionOneTwo(`https://www.exam.poc.ac/api/delete_question_three/${questionId}`)
    
    const resCode = await res?.code
    if(resCode == 200) {
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Deleted'} , {root: true})
    } else {
      context.dispatch('notifications/add', {type: 'error', message: 'Failed to Delete'} , {root: true})
      throw new Error('could not delete question model two')

    }
  },




  async editQuestionTypeOne(context, question) {
    const {id, exam_name, exam_pack, q_image, question_name} = question;
    const allOptions = question.options


    console.log(allOptions)

    

    const data = {
      id,
      exam_name, 
      exam_pack, 
      q_image, 
      question_name
    }
    if(!data.q_image || typeof data.q_image == 'string') {
      // console.log(mainProfile.q_image)
      delete data.q_image
    }
    
    const questionRes = await examPackApi.editQuestionAndOption(data, `https://www.exam.poc.ac/api/edit_question_one/${data.id}`);
    const questionData = await questionRes.data;
   

    if(questionData) {
      allOptions.forEach(async (option) => {
        await examPackApi.editQuestionAndOption(option, `https://www.exam.poc.ac/api/edit_ans_model_one/${option.id}`)
      })

      const allQuestion = context.state.examQuestions;
      const upd = allQuestion.map(q => q.uuid == question.uuid ? {...q, ...question} : q)
      context.commit(examPackMutationTypes.SET_EXAM_QUESTIONS,upd)

      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Edited'} , {root: true})

    } else {
      throw new Error('could not create question type two')
    }
    


  },

  async editQuestionTypeTwo(context, question) {
    const {id, exam_name, exam_pack, question_name, data_one, data_two, data_three } = question;
    
    const allOptions = question.options
    console.log(allOptions)
    

    const data = {
      id,
      exam_name, 
      exam_pack, 
      description: question.description,
      Q_image: question.Q_image,
      question_name,
      data_one, 
      data_two, 
      data_three,
      data_four: question.data_four
    }
    if(!data.Q_image || typeof data.Q_image == 'string') {
      // console.log(mainProfile.q_image)
      delete data.Q_image
    }
    
    const questionRes = await examPackApi.editQuestionAndOption(data, `https://www.exam.poc.ac/api/edit_question_two/${data.id}`);
    const questionData = await questionRes.data;
    

    if(questionData) {
      allOptions.forEach(async (option) => {
        await examPackApi.editQuestionAndOption(option, `https://www.exam.poc.ac/api/edit_ans_two/${option.id}`)
      })

      const allQuestion = context.state.examQuestions;
      const upd = allQuestion.map(q => q.uuid == question.uuid ? {...q, ...question} : q)
      context.commit(examPackMutationTypes.SET_EXAM_QUESTIONS,upd)

      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Edited'} , {root: true})

    } else {
      throw new Error('could not create question type two')
    }

  },
  
  async editQuestionTypeThree(context, payload) {
    const {q_description, q_image, exam_pack, exam_name} = payload;

    const mainData = {
      q_description, 
      q_image, 
      question_name: payload.question1?.question_name,
      question_one_ans_one: payload.question1?.options[0].ans,
      question_one_ans_one_is_correct: payload.question1?.options[0].is_correct,
      question_one_ans_two: payload.question1?.options[1].ans,
      question_one_ans_two_is_correct: payload.question1?.options[1].is_correct,
      question_one_ans_three: payload.question1?.options[2].ans,
      question_one_ans_three_is_correct: payload.question1?.options[2].is_correct,
      question_one_ans_four: payload.question1?.options[3].ans,
      question_one_ans_four_is_correct: payload.question1?.options[3].is_correct,

      question_name_two:  payload.question2.question_name,
      sample_one: payload.question2?.data_one,
      sample_two: payload.question2?.data_two,
      sample_three: payload.question2?.data_three,
      question_two_ans_one: payload.question2?.options[0].ans,
      question_two_ans_one_is_correct: payload.question2?.options[0].is_correct,
      question_two_ans_two: payload.question2?.options[1].ans,
      question_two_ans_two_is_correct: payload.question2?.options[1].is_correct,
      question_two_ans_three: payload.question2?.options[2].ans,
      question_two_ans_three_is_correct: payload.question2?.options[2].is_correct,
      question_two_ans_four: payload.question2?.options[3].ans,
      question_two_ans_four_is_correct: payload.question2?.options[3].is_correct,
    }
    if(!mainData.q_image || typeof mainData.q_image == 'string') {
      // console.log(mainProfile.q_image)
      delete mainData.q_image
    }

    const questionRes = await examPackApi.editQuestionAndOption(mainData, `https://www.exam.poc.ac/api/edit_question_three/${payload.id}`);
    const questionData = await questionRes.data;

    if(questionData) {
      const allQuestion = context.state.examQuestions;
      const upd = allQuestion.map(q => q.uuid == payload.uuid ? {...q, ...payload, otherQuestions: [payload.question1, payload.question2]} : q)
      context.commit(examPackMutationTypes.SET_EXAM_QUESTIONS,upd)
      context.dispatch('notifications/add', {type: 'success', message: 'Successfully Edited'} , {root: true})
    } else {
      throw new Error('could not create question type three')
    }

  }
}


export const examPack = {
  namespaced: true,
  state,
  mutations,
  actions
}