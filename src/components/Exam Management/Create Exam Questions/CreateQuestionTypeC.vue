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
          v-model="questionTypeThree.q_description"
          :style="{
            minHeight: '120px',
            resize: 'vertical'
          }"
          />
      </div>
    </div>
    
    <div class="questions" v-for="(examQuestion, index) in questionTypeThreeMain.otherQuestions" :key="index">
      {{JSON.stringify(examQuestion)}}
      <CreateQuestionTypeA 
        v-if="examQuestion.type == 'Type 01'" 
        :questionTypeOne="examQuestion" 
        :isFromTypeC="true"/>

      <CreateQuestionTypeB 
        v-if="examQuestion.type == 'Type 02'" 
        :questionTypeTwo="examQuestion" 
        :isFromTypeC="true"/>

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
  


    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`);


    const previewImage = ref(null)
    const handleIInput = (e) => {
      console.log(e)
      previewImage.value = e;
    }


    const handleDeleteQuestion = () => {
      console.log('delete q3')
    }
    const handleSaveQuestion = () => {
      console.log('save q3')
      ctx.emit('onSaveQuestion',{...questionTypeThreeMain.value}, 'Type 03' )

      
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
      questionTypeThreeMain
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
  gap: 5rem;
  .para__header, .para {
    @extend .pDefault;
    margin-bottom: 0.5rem;
  }
  .questions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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