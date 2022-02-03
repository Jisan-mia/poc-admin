<template>
  <div class="type-3">
    <!-- <div class="para__header">
      {{questionTypeThree.paragraphHeader}}
    </div> -->

    <div class="question">
      <div class="show_image" v-if="questionTypeThreeMain.q_image">
          <img :src="previewImage ? previewImage : typeof questionTypeThreeMain.q_image == 'string' && questionTypeThreeMain.q_image ? imageUrl(questionTypeThreeMain.q_image) : '/images/addQuestionImg.svg'" alt="">
      </div>
      <div class="question__top" >
        <p>উদ্দীপক...</p>
        <div class="img__cont">
          <img src='/images/addQuestionImg.svg' alt="">
          <span>
            <ImgInputModel v-model="questionTypeThreeMain.q_image" @imagInput="handleIInput"/>
          </span>
        </div>
      </div>

      <div class="qBottom">
        <AdminCustomInput 
          :isTextArea="true"
          placeholder="উদ্দীপক..."
          v-model="questionTypeThreeMain.q_description"
          :style="{
            minHeight: '120px',
            resize: 'vertical'
          }"
          />
      </div>
    </div>
    
    <div class="questions" v-for="(examQuestion, index) in questionTypeThreeMain.otherQuestions" :key="index">
      <CreateQuestionTypeA 
        v-if="examQuestion.type == 'Type 01'" 
        :questionTypeOne="examQuestion" 
        :isFromTypeC="true"
        @typeOneQuestion="typeOneQuestionContent"
      />

      <CreateQuestionTypeB 
        v-if="examQuestion.type == 'Type 02'" 
        :questionTypeTwo="examQuestion" 
        :isFromTypeC="true"
        @typeTwoQuestion="typeTwoQuestionContent"

      />

    </div>

  </div>
  <QuestionCreateBtns :isNewQ="questionTypeThree.isNewQuestion" @onQuestionDelete="handleDeleteQuestion" @onQuestionSave="handleSaveQuestion" @onQuestionEdit="handleEditQuestion"  />



</template>

<script>
import { computed, ref } from '@vue/reactivity'
import CreateQuestionTypeA from './CreateQuestionTypeA.vue';
import CreateQuestionTypeB from './CreateQuestionTypeB.vue';
import QuestionCreateBtns from './QuestionCreateBtns.vue';
import AdminCustomInput from '../AdminCustomInput.vue';
import InputImgComp from '../../ui/InputImgComp.vue';
import ImgInputModel from '../../ui/ImgInputModel.vue';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'vuex';
import { getNotification } from '../../../api/common';

export default {
  name: "CreateQuestionTypeC",
  emits: ['onSaveQuestion'],
  props: {
    questionTypeThree: {
      type: Object,
      required: true
    }

  },
  setup(props, ctx) {

    const store = useStore()

    const questionTypeThreeMain = ref({
        // uuid: uuidv4(),
        // exam_pack: '',
        // exam_name: '',      -> these attributes come from props always when question is added
        // isNewQuestion: true,
        type: 'Type 03',
        q_description: '',
        q_image: '',
        otherQuestions: [
          {
            type: 'Type 01',
            uuid: uuidv4(), 
            isNewQuestion: true
          },
          {
            type: 'Type 02',
            uuid: uuidv4(),
            isNewQuestion: true
          }
        ]
    })


    questionTypeThreeMain.value = !props.questionTypeThree.isNewQuestion 
                                  ? {...props.questionTypeThree} 
                                  : {...questionTypeThreeMain.value, ...props.questionTypeThree}
                                  
    const typeOneQuestion = ref(null)
    const typeTwoQuestion = ref(null)

  

    const typeOneQuestionContent = (question) => {
      // console.log(question)
      typeOneQuestion.value = question
    }

    const typeTwoQuestionContent = (question) => {
      // console.log(question)
      typeTwoQuestion.value = question
    }



    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`);


    const previewImage = ref(null)
    const handleIInput = (e) => {
      console.log(e)
      previewImage.value = e;
    }


    const handleDeleteQuestion = () => {
      console.log('delete q3')
    }

    const isValid1 = () => {
      const isValid = ref(true);
      if(!typeOneQuestion.value?.question_name) {
        store.dispatch('notifications/add', getNotification('warning', `Question name is empty type-1`));
        return false
      } else if(!typeOneQuestion.value?.selectedOption) {
        store.dispatch('notifications/add', getNotification('warning', `You must select an answer type-1`));
        return false
      }

      for(let option of typeOneQuestion.value?.options) {
        if(option.ans == '') {
          isValid.value = false
          store.dispatch('notifications/add', getNotification('warning', `Option cannot be empty type-1`))
          break; 
        } else {
          isValid.value = true;
        }
      }
      return isValid.value;
    }

    const isValid2 = () => {
      const isValid = ref(true);
       if(!typeTwoQuestion.value?.question_name) {
        store.dispatch('notifications/add', getNotification('warning', `Question name is empty type-2`));
        return false
      } else if(!typeTwoQuestion.value?.data_one && !typeTwoQuestion.value?.data_two && !typeTwoQuestion.value?.data_three) {
        store.dispatch('notifications/add', getNotification('warning', `Sample data cannot be empty type-2`));
        return false
      } else if(!typeTwoQuestion.value?.selectedOption) {
        store.dispatch('notifications/add', getNotification('warning', `You must select an answer type-2`));
        return false
      }

      for(let option of typeTwoQuestion.value?.options) {
        if(option.ans == '') {
          isValid.value = false
          store.dispatch('notifications/add', getNotification('warning', `Option cannot be empty type-2`))
          break; 
        } else {
          isValid.value = true;
        }
      }
      return isValid.value;
    }


    const checkIsAllValid =()=> {
      console.log(questionTypeThreeMain.value)
      const isItValid1 = ref(true)
      const isItValid2 = ref(true)


      if(!questionTypeThreeMain.value?.q_description && !questionTypeThreeMain.value?.q_image) {
        store.dispatch('notifications/add', getNotification('warning', `Description or image cannot be empty type-3`));
        return false
      } 

      if(isValid1()) {
        const mainOptions = typeOneQuestion.value.options.map((option) => {
          return {
            ...option,
            is_correct: option.ans == typeOneQuestion.value.selectedOption
          }
        })

        const findCorrectAns = mainOptions.find(o => o.is_correct)
        // console.log(findCorrectAns)
        if(!findCorrectAns?.is_correct) {
          store.dispatch('notifications/add', getNotification('warning', `Select the correct ans`))

          return false
          // isItValid1.value = false

        }
        typeOneQuestion.value = {...typeOneQuestion.value, options: mainOptions}
        isItValid1.value = true

      } else {
        isItValid1.value = false
      }
      

      if(isValid2()) {
        const mainOptions = typeTwoQuestion.value.options.map((option) => {
          return {
            ...option,
            is_correct: option.ans == typeTwoQuestion.value.selectedOption
          }
        })

       const findCorrectAns = mainOptions.find(o => o.is_correct)
        console.log(findCorrectAns)
        if(!findCorrectAns?.is_correct) {
          store.dispatch('notifications/add', getNotification('warning', `Select the correct ans`))

          return false
          // isItValid2.value = false

        }

        typeTwoQuestion.value = {...typeTwoQuestion.value, options: mainOptions}
        isItValid2.value = true
        

      } else {
        isItValid2.value = false

      }

      return isItValid1.value && isItValid2.value
    } 


    const saveQ3 = async (question) => {
      try{
        await store.dispatch('examPackState/createQuestionTypeThree', question);

      } catch(err) {
        console.log(err)
      }
    }

    const handleSaveQuestion = () => {
      console.log('save q3')

      if(checkIsAllValid()) {


        console.log(typeOneQuestion.value, typeTwoQuestion.value)
        const mainQuestionThree = {
          ...questionTypeThreeMain.value,
          question1: {
            ...typeOneQuestion.value
          },
          question2: {
            ...typeTwoQuestion.value
          }
        }
        delete mainQuestionThree.otherQuestions





      // ctx.emit('onSaveQuestion',{...questionTypeThreeMain.value}, 'Type 03' )
        saveQ3(mainQuestionThree)

      }

      






      
    }
    const handleEditQuestion = () => {
      console.log('edit q3')
    }

    


    return {
      handleIInput,
      previewImage,
      imageUrl,
      handleDeleteQuestion,
      handleSaveQuestion,
      handleEditQuestion,
      questionTypeThreeMain,
      typeOneQuestionContent,
      typeTwoQuestionContent
    }
  },
  components: { CreateQuestionTypeA, CreateQuestionTypeB, QuestionCreateBtns, AdminCustomInput, InputImgComp, ImgInputModel }
}
</script>

<style lang="scss" scoped>

@import '@/styles/config.scss';

.pDefault {
  font-size: 1rem;
  color: rgb(0 0 0 / 70%);
  line-height: 1.25rem;
  font-weight: 500;
}
.type-3 {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  .para__header, .para {
    @extend .pDefault;
    margin-bottom: 0.5rem;
  }
  .questions {
    display: flex;
    flex-direction: column;
    // gap: rem;
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
</style>