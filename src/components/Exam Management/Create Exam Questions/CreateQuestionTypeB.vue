<template>
  <div class="question__inner">

    <div class="question" v-if="!isFromTypeC">
      <div class="show_image" v-if="questionTypeTwoMain.Q_image">
          <img :src="previewImage ? previewImage : typeof questionTypeTwoMain.Q_image == 'string' && questionTypeTwoMain.Q_image ? imageUrl(questionTypeTwoMain.Q_image) : '/images/addQuestionImg.svg'" alt="">
      </div>
      <div class="question__top" >
        <p>উদ্দীপক...</p>
        <div class="img__cont">
          <img src='/images/addQuestionImg.svg' alt="">
          <span>
            <ImgInputModel v-model="questionTypeTwoMain.Q_image" @imagInput="handleIInput"/>
          </span>
        </div>
      </div>

      <div class="qBottom">
        <AdminCustomInput 
          :isTextArea="true"
          placeholder="উদ্দীপক..."
          v-model="questionTypeTwoMain.description"
          :style="{
            minHeight: '120px',
            resize: 'vertical'
          }"
          />
      </div>
    </div>

    <div class="hints">
      <p class="hints__header">
        <!-- {{questionTypeTwo.hintsHeader}} -->
        <!-- নিচের তথ্যগুলো লক্ষ করঃ -->
          <!-- placeholder="প্রশ্ন..." -->

        <span class="qH">প্রশ্ন...</span>
        <span class="qHI">
          <AdminCustomInput 
          :isTextArea="true"
          v-model="questionTypeTwoMain.question_name"
          :style="{
            border: 'none',
            padding: '0px',
            background: 'inherit',
            minHeight: '40px',
            resize: 'vertical'
          }"
        />
        </span>
      </p>
      <div class="hints__option">
        <ul>
          <li v-for="key of dataOptions" :key="key">
            <span>
              {{key == 'data_one' ? 'i' : key == 'data_two' ? 'ii' : key == 'data_three' ? 'iii' : key == 'data_four' ? 'iv' : ''}}.
            </span>
            <AdminCustomInput
              v-model="questionTypeTwoMain[key]"
              :placeholder="questionTypeTwoMain[key]"
              :isTextArea="true"
              :style="{
                border: 'none',
                padding: '0px',
                background: 'inherit',
                minHeight: '40px',
                resize: 'vertical'
              }"
              />
          </li>
        </ul>
      </div>
      
    </div>
    
    <div class="option__cont">
      <p class="mH">
        <!-- {{questionTypeTwo.optionsHeader}} -->
        নিচের কোনটি সঠিকঃ
      </p>

      <!-- <div class="options">
      <CustomRadioButton
        v-for="option in questionTypeTwoMain.options"
        :key="option"
        :option="option"
        name='type1'
        v-model="questionTypeTwoMain.correctAns"
      />
    </div> -->

      <div class="options">

      <div class="option" v-for="(option, index) in questionTypeTwoMain.options" :key="index">
        <span class="radio">
          <CustomRadioButton
            :option="questionTypeTwoMain.options[index].ans"
            :name="questionTypeTwoMain.uuid"
            v-model="questionTypeTwoMain.selectedOption"
            :isEditOption="true"
          />
        </span>
        <span class='input__elm'>
          <AdminCustomInput 
            :placeholder="questionTypeTwoMain.options[index].ans"
            v-model="questionTypeTwoMain.options[index].ans"
            :style="{
              border: 'none',
              background: 'transparent',
              padding: '0rem',
              minHeight: '40px',
              resize: 'vertical',
              width: '100%'
            }"
            :isTextArea="true"
          />
        </span>

      </div>

    </div>




    </div>
    

    <!-- <QuestionCreateBtns v-if="!isFromTypeC" /> -->
    <QuestionCreateBtns v-if="!isFromTypeC" :isNewQ="questionTypeTwoMain.isNewQuestion" @onQuestionDelete="handleDeleteQuestion" @onQuestionSave="handleSaveQuestion" @onQuestionEdit="handleEditQuestion"  />

  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import CustomSelect from '../../ui/CustomSelect.vue';
import AdminCustomInput from '../AdminCustomInput.vue';
import CustomRadioButton from '../../ui/CustomRadioButton.vue';
import CustomAdminBtn from '../../ui/CustomAdminBtn.vue';
import QuestionCreateBtns from './QuestionCreateBtns.vue';
import InputImgComp from '../../ui/InputImgComp.vue';
import { useStore } from 'vuex';
import { getNotification } from '../../../api/common';
import ImgInputModel from '../../ui/ImgInputModel.vue';
import { examPackMutationTypes } from '../../../store/modules/examPack/examPack.mutationTypes';
import { watch, watchEffect } from '@vue/runtime-core';
export default {
  name: "CreateQuestionTypeB",
  components: { CustomSelect, AdminCustomInput, CustomRadioButton, CustomAdminBtn, QuestionCreateBtns, InputImgComp, ImgInputModel },
  props: {
    questionTypeTwo: {
      type: Object,
      required: true
    },
    isFromTypeC: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, ctx) {
    // console.log(props.questionTypeTwo);
    const store  = useStore();
    const examAllQuestions = computed(() => store.state.examPackState.examQuestions);

  
    const questionTypeTwoMain = ref({
      // uuid: uuidv4(), 
      // exam_pack: examPack,     -> these three attribute will come from props always
      // exam_name: examName,
      isNewQuestion: true,
      uuid: '',
      Q_image: '',
      type: 'Type 02',
      description: "",
      question_name: "",
      data_one: "" ,
      data_two: "" ,
      data_three: "" ,
      data_four: "" ,
      selectedOption: '',
      options: [
          {
            Question: '',
            ans: '',
            is_correct: false
          },
          {
            Question: '',
            ans: '',
            is_correct: false
          },
          {
            Question: '',
            ans: '',
            is_correct: false
          },
          {
            Question: '',
            ans: '',
            is_correct: false
          }
      ],
    })


    questionTypeTwoMain.value = !props.questionTypeTwo.isNewQuestion 
                                  ? {...props.questionTypeTwo} 
                                  : {...questionTypeTwoMain.value, ...props.questionTypeTwo} 


    watch(questionTypeTwoMain.value, () => {
      if(props.isFromTypeC) {
        ctx.emit('typeTwoQuestion', questionTypeTwoMain.value)
      }
    })


    const dataOptions = computed(() => {
      if(props.isFromTypeC) {
        return [
          'data_one',
          'data_two',
          'data_three',
        ]
      }
      return [
        'data_one',
        'data_two',
        'data_three',
        'data_four'
      ]
      
     
      
    })



    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`);


    const isValid = () => {
      const isValid = ref(true);
      if(!questionTypeTwoMain.value.description && !questionTypeTwoMain.value.Q_image) {
        store.dispatch('notifications/add', getNotification('warning', `Description or image cannot be empty`));
        return false
      } else if(!questionTypeTwoMain.value.question_name) {
        store.dispatch('notifications/add', getNotification('warning', `Question name is empty`));
        return false
      } else if(!questionTypeTwoMain.value.data_one && !questionTypeTwoMain.value.data_two && !questionTypeTwoMain.value.data_three) {
        store.dispatch('notifications/add', getNotification('warning', `Sample data cannot be empty`));
        return false
      } else if(!questionTypeTwoMain.value.selectedOption) {
        store.dispatch('notifications/add', getNotification('warning', `You must select an answer`));
        return false
      }

      for(let option of questionTypeTwoMain.value.options) {
        if(option.ans == '') {
          isValid.value = false
          store.dispatch('notifications/add', getNotification('warning', `Option cannot be empty`))
          break; 
        } else {
          isValid.value = true;
        }
      }
      return isValid.value;
    }


    const saveQ2 = async (question) => {
      try{
        await store.dispatch('examPackState/createQuestionTypeTwo', question);

        const findQ = examAllQuestions.value.find(q => q.uuid == questionTypeTwoMain.value.uuid)
        // console.log(findQ)
        if(!findQ?.isNewQuestion) {
          questionTypeTwoMain.value.isNewQuestion = false
        }

      } catch(err) {
        console.log(err)
      }
    }




    const handleSaveQuestion = () => {
      console.log('save question')
      if(isValid()) {
        const mainOptions = questionTypeTwoMain.value.options.map((option) => {
          return {
            ...option,
            Question: questionTypeTwoMain.value.question_name,
            is_correct: option.ans == questionTypeTwoMain.value.selectedOption
          }
        })

       const findCorrectAns = mainOptions.find(o => o.is_correct)
        console.log(findCorrectAns)
        if(!findCorrectAns?.is_correct) {
          store.dispatch('notifications/add', getNotification('warning', `Select the correct ans`))

          return
        }


        // ctx.emit('onSaveQuestion',{...questionTypeTwoMain.value, options: mainOptions}, 'Type 02' )
        saveQ2({...questionTypeTwoMain.value, options: mainOptions})
      }
    }

    const handleEditQuestion = async () => {
      if(isValid()) {
        const mainOptions = questionTypeTwoMain.value.options.map((option) => {
          return {
            ...option,
            is_correct: option.ans == questionTypeTwoMain.value.selectedOption
          }
        })

        const findCorrectAns = mainOptions.find(o => o.is_correct)
        console.log(findCorrectAns)
        if(!findCorrectAns?.is_correct) {
          store.dispatch('notifications/add', getNotification('warning', `Select the correct ans`))

          return
        }


        try {
          await store.dispatch('examPackState/editQuestionTypeTwo', {...questionTypeTwoMain.value, options: mainOptions});
          // await store.dispatch('examPackState/loadExamQuestions', questionTypeTwoMain.value.exam_name);

        } catch(err) {
          console.log(err)
        }
      } 
      
    }


     const updatedDeletedQ = (question) => {
      const filteredQ = examAllQuestions.value.filter(q => q.uuid !== question.uuid)
      store.commit(`examPackState/${examPackMutationTypes.SET_EXAM_QUESTIONS}`, filteredQ )
    }

    const deleteQ2 = async (question) => {
      try {
        await store.dispatch('examPackState/deleteQuestionTypeTwo', question.id);
        updatedDeletedQ(question)

      } catch(err) {
        console.log(err)
      }
    }

    const handleDeleteQuestion = () => {
      console.log('delete quesiton', questionTypeTwoMain.value, 'Type 02');
      // ctx.emit('onDeleteQuestion', questionTypeTwoMain.value, 'Type 02')
      if(questionTypeTwoMain.value.isNewQuestion) {
        // const filteredQ = examAllQuestions.value.filter(question => question.uuid !== questionTypeTwoMain.value.uuid)
        // store.commit(`examPackState/${examPackMutationTypes.SET_EXAM_QUESTIONS}`, filteredQ )
        updatedDeletedQ(questionTypeTwoMain.value)

      } else {
        deleteQ2(questionTypeTwoMain.value)
      }

    }

    const previewImage = ref(null)
    const handleIInput = (e) => {
      console.log(e)
      previewImage.value = e;
    }


    return {
      handleSaveQuestion,
      handleEditQuestion,
      handleDeleteQuestion,
      imageUrl,
      questionTypeTwoMain,
      handleIInput,
      previewImage,
      dataOptions
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/config.scss';
.question__inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;

  .hints {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 1rem;
    width: 100%;

    .hints__header {
      margin-bottom: 1rem;
    }
    .qH {
      font-weight: 600;
      color: #000000cf;
      font-size: 1.13rem;
      margin-bottom: 0.4rem;
    }
    .qHI {
      border-bottom: 1px solid grey;
      margin-bottom: 1.5rem;
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;

    }

    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      
      li {
        border-bottom: 1px solid grey;
        display: flex;
        justify-content: flex-start;
        gap: 0.38rem;

        span {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;

          &::selection {
            background: transparent;
          }
        }
      }
    }
  }
  .question {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    &__top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.15rem;
      font-weight: 500;
      p {
        font-weight: 600;
        color: #000000cf;
        font-size: 1.13rem;
        margin-bottom: 0.4rem;
      }
    }
    .img__cont {
      position: relative;
      // background: #CFCFCF;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      // height: 290px;
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-position: center center;
      }

      span{
        position: absolute;
        bottom: 0;
        right: 0;
        top:0;
        left: 0;
        cursor: pointer;

        input {
          position: absolute;
          /* top: 0; */
          opacity: 0;
          inset: 0;
          width: 100%;
          cursor: pointer;
        }
      }

    }


    .show_image {
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 210px;
      max-width: 400px;
      overflow: hidden;
      display: block;
      align-self: center;
      margin-bottom: 1.5rem;
      @include maxMedia(768px) {
        max-width: 100%;
        height: 200px;
      }
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-position: center center;
        border-radius: 5px;
      }
    }
  }
  .options {
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.95rem;
    margin-top:0.9rem;

    .option {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      border-bottom: 1px solid grey;
      
      .radio{
        flex-basis: 4%;
      }
      .input__elm {
        flex-basis: 96%;
      }
    }
  }
  .option__cont{
    @extend .options;
    margin: 1.8rem 0;

    .mH{
      font-weight: 600;
      color: #000000cf;
      font-size: 1.13rem;
      margin-bottom: 0.4rem;
    }
  }
  

  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    margin-top: 1.5rem;
    .wrapper{
      min-width: 150px;
    }
    .delete {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: none;
      outline: none;
      cursor: pointer;
      background-color: inherit;
      
      font-weight: 500;

      i.far {
        color: red;
        width: 28px;
      }
      span {
        color: red;
        font-size: 1.1rem;
        margin-left:0.5rem;
        text-decoration: underline;
      }
    }
  }
}
</style>