<template>
  <div class="question__inner">

    <div class="question">
      <div class="show_image" v-if="questionTypeOneMain.q_image">
          <img :src="previewImage ? previewImage : typeof questionTypeOneMain.q_image == 'string' && questionTypeOneMain.q_image ? imageUrl(questionTypeOneMain.q_image) : '/images/addQuestionImg.svg'" alt="">
      </div>
      <div class="question__top">
        <p>প্রশ্ন...</p>
        <div class="img__cont" v-if="!isFromTypeC">
          <img src='/images/addQuestionImg.svg' alt="">
          <span>
            <ImgInputModel v-model="questionTypeOneMain.q_image" @imagInput="handleIInput"/>
          </span>
        </div>
      </div>

      <div class="qBottom">
        <!-- <AdminCustomInput 
          :isTextArea="true"
          placeholder="প্রশ্ন..."
          v-model="questionTypeOneMain.question_name"
          :style="{
            minHeight: '120px',
            resize: 'vertical'
          }"
          /> -->

        <!-- <QuestionTextArea
          placeholder="প্রশ্ন..."
          v-model="questionTypeOneMain.question_name"
        /> -->
        <div class="cont">

          <ckeditor 
            :editor="editor" 
            v-model="questionTypeOneMain.question_name" 
            :config="editorConfig" :disabled="false">
          </ckeditor>
        </div>
      </div>
    </div>


<!-- <span :style="{maxWidth: '300px'}">
      {{JSON.stringify(questionTypeOneMain)}}
  </span>     -->

    <div class="options">

      <div class="option" v-for="(option, index) in questionTypeOneMain.options" :key="index">
        <span class="radio">
          <CustomRadioButton
            :option="questionTypeOneMain.options[index].ans"
            :name="questionTypeOneMain.uuid"
            v-model="questionTypeOneMain.selectedOption"
            :isEditOption="true"
          />
        </span>
        <span class='input__elm'>
          <!-- <AdminCustomInput 
            :placeholder="questionTypeOneMain.options[index].ans"
            v-model="questionTypeOneMain.options[index].ans"
            :style="{
              border: 'none',
              background: 'transparent',
              padding: '0rem',
              minHeight: '40px',
              width: '100%',
              fontSize: '16px',
              fontWeight: '400'
            }"
          /> -->
          <div class="cont contOptions">
            <ckeditor 
            :editor="editor" 
            v-model="questionTypeOneMain.options[index].ans" 
            :config="editorConfig" :disabled="false">
          </ckeditor>
          </div>
        </span>

      </div>

    </div>

    <QuestionCreateBtns v-if="!isFromTypeC" :isNewQ="questionTypeOneMain.isNewQuestion" @onQuestionDelete="handleDeleteQuestion" @onQuestionSave="handleSaveQuestion" @onQuestionEdit="handleEditQuestion"  />
    
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
import ImgInputModel from '../../ui/ImgInputModel.vue';
import { watch, watchEffect } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { editorConfig, getNotification } from '../../../api/common';
import { examPackMutationTypes } from '../../../store/modules/examPack/examPack.mutationTypes';
import QuestionTextArea from '../../ui/QuestionTextArea.vue';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';



export default {
  name: "CreateQuestionTypeA",
  components: { CustomSelect, AdminCustomInput, CustomRadioButton, CustomAdminBtn, QuestionCreateBtns, InputImgComp, ImgInputModel, QuestionTextArea },
  props: {
    questionTypeOne: {
      type: Object,
      required: true
    },
    isFromTypeC: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, ctx) {
    const store = useStore();
    // console.log(props.questionTypeOne);
    const examAllQuestions = computed(() => store.state.examPackState.examQuestions);
    const editor = InlineEditor;


    const questionTypeOneMain = ref({
      // uuid: uuidv4(), 
      // exam_pack: examPack,     -> these three attribute will come from props always
      // exam_name: examName,
      isNewQuestion: true,
      uuid: '',
      question_name: '',
      q_image: '',
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

    questionTypeOneMain.value = !props.questionTypeOne.isNewQuestion 
                                  ? {...props.questionTypeOne} 
                                  : {...questionTypeOneMain.value, ...props.questionTypeOne} 
    
    
    // watch(questionTypeOneMain.value, () => {
    //   console.log(questionTypeOneMain.value);
    // })
    watch(questionTypeOneMain.value, () => {
      console.log(questionTypeOneMain.value)
      if(props.isFromTypeC) {
        ctx.emit('typeOneQuestion', questionTypeOneMain.value)
      }
    })
    


    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`);


    const isValid = () => {
      const isValid = ref(true);
      if(!questionTypeOneMain.value.question_name) {
        store.dispatch('notifications/add', getNotification('warning', `Question name is empty`));
        return false
      } else if(!questionTypeOneMain.value.selectedOption) {
        store.dispatch('notifications/add', getNotification('warning', `You must select an answer`));
        return false
      }

      for(let option of questionTypeOneMain.value.options) {
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


    const saveQ1 = async (question) => {
      try{
        await store.dispatch('examPackState/createQuestionTypeOne', question);
        // console.log(examAllQuestions.value)
        const findQ = examAllQuestions.value.find(q => q.uuid == questionTypeOneMain.value.uuid)
        console.log(findQ)

        if(!findQ?.isNewQuestion) {
          questionTypeOneMain.value.isNewQuestion = false
        }

      } catch(err) {
        console.log(err)
      }
    }


    const handleSaveQuestion = () => {
      console.log('save question')
      if(isValid()) {
        const mainOptions = questionTypeOneMain.value.options.map((option) => {
          return {
            ...option,
            Question: questionTypeOneMain.value.question_name,
            is_correct: option.ans == questionTypeOneMain.value.selectedOption
          }
        })

        const findCorrectAns = mainOptions.find(o => o.is_correct)
        // console.log(findCorrectAns)
        if(!findCorrectAns?.is_correct) {
          store.dispatch('notifications/add', getNotification('warning', `Select the correct ans`))

          return
        }

        // ctx.emit('onSaveQuestion',{...questionTypeOneMain.value, options: mainOptions}, 'Type 01' );
        saveQ1({...questionTypeOneMain.value, options: mainOptions})
      }
    }

    const handleEditQuestion = async () => {
      if(isValid()) {
        const mainOptions = questionTypeOneMain.value.options.map((option) => {
          return {
            ...option,
            is_correct: option.ans == questionTypeOneMain.value.selectedOption
          }
        })

        const findCorrectAns = mainOptions.find(o => o.is_correct)
        // console.log(findCorrectAns)
        if(!findCorrectAns?.is_correct) {
          store.dispatch('notifications/add', getNotification('warning', `Select the correct ans`))

          return
        }

        try {
          await store.dispatch('examPackState/editQuestionTypeOne', {...questionTypeOneMain.value, options: mainOptions});
          // await store.dispatch('examPackState/loadExamQuestions', questionTypeOneMain.value.exam_name);

        } catch(err) {
          console.log(err)
        }
      }
      
    }

    const updatedDeletedQ = (question) => {
      const filteredQ = examAllQuestions.value.filter(q => q.uuid !== question.uuid)
      store.commit(`examPackState/${examPackMutationTypes.SET_EXAM_QUESTIONS}`, filteredQ )
    }


    const deleteQ1 = async (question) => {
      try {
        await store.dispatch('examPackState/deleteQuestionTypeOne', question.id);
        updatedDeletedQ(question)

      } catch(err) {
        console.log(err)
      }
    }

    const handleDeleteQuestion = () => {
      console.log('delete question', );
      // ctx.emit('onDeleteQuestion', questionTypeOneMain.value, 'Type 01')
      if(questionTypeOneMain.value.isNewQuestion) {
        // const filteredQ = examAllQuestions.value.filter(question => question.uuid !== questionTypeOneMain.value.uuid)
        // store.commit(`examPackState/${examPackMutationTypes.SET_EXAM_QUESTIONS}`, filteredQ )
        updatedDeletedQ(questionTypeOneMain.value)


      } else {
        deleteQ1(questionTypeOneMain.value)
      }
    }

    

    const previewImage = ref(null)
    const handleIInput = (e) => {
      console.log(e)
      previewImage.value = e;
    }

    return {
      handleIInput,
      previewImage,
      imageUrl,
      handleDeleteQuestion,
      handleSaveQuestion,
      questionTypeOneMain,
      handleEditQuestion,
      editor,
      editorConfig
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/config.scss';

.cont {
  div {
    background: #fdfdfd;
    border: 1.8px solid #00A9DC !important;
    box-sizing: border-box; 
  }
  .ck.ck-editor__editable_inline>:last-child {
    margin-bottom: 0.5rem !important;
  }
  .ck.ck-editor__editable_inline>:first-child {
    margin-top: 0.5rem !important;
  }
}
.cont.contOptions {
  div {
    background: transparent;
    border: none!important;
    box-sizing: border-box; 
    padding-left: 0!important;

  }
  .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
    box-shadow: none !important;
  }
}
.question__inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;

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
      p{
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
    gap: 0.68rem;
    margin-top:0.9rem;

    .option {
      width: 100%;
      display: flex;
      align-items: center;
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

  
}



</style>