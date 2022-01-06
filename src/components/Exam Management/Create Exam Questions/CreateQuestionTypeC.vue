<template>
  <div class="type-3">
    <!-- <div class="para__header">
      {{questionTypeThree.paragraphHeader}}
    </div> -->

    <div class="question">
      <div class="question__top">
        <p>উদ্দীপক</p>
        <div class="img__cont">
          <!-- <img src="/images/addQuestionImg.svg" alt=""> -->
          <InputImgComp @input="handleImgInput" />
        </div>
      </div>

      <div class="qBottom">
        <AdminCustomInput 
          :isTextArea="true"
          placeholder="উদ্দীপক..."
          v-model="questionTypeThree.paragraph"
          :style="{
            minHeight: '120px',
            resize: 'vertical'
          }"
          />
      </div>
    </div>
    
    <div class="questions" v-for="(examQuestion, index) in questionTypeThree.questions" :key="index">

      <CreateQuestionTypeA 
        v-if="examQuestion.type == 'A'" 
        :questionTypeOne="examQuestion" 
        :isFromTypeC="true"/>

      <CreateQuestionTypeB 
        v-if="examQuestion.type == 'B'" 
        :questionTypeTwo="examQuestion" 
        :isFromTypeC="true"/>

    </div>

  </div>
  <QuestionCreateBtns />


</template>

<script>
import { ref } from '@vue/reactivity'
import CreateQuestionTypeA from './CreateQuestionTypeA.vue';
import CreateQuestionTypeB from './CreateQuestionTypeB.vue';
import QuestionCreateBtns from './QuestionCreateBtns.vue';
import AdminCustomInput from '../AdminCustomInput.vue';
import InputImgComp from '../../ui/InputImgComp.vue';
export default {
  name: "CreateQuestionTypeC",
  props: {
    questionTypeThree: {
      type: Object,
      required: true
    }

  },
  setup(props) {
    console.log(props.questionTypeOne)

    const handleImgInput = (img) => {
      props.questionTypeOne.img = img
    }
    return {
      handleImgInput
    }
  },
  components: { CreateQuestionTypeA, CreateQuestionTypeB, QuestionCreateBtns, AdminCustomInput, InputImgComp }
}
</script>

<style lang="scss" scoped>
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
  }
  .img__cont {
    max-width: 20px;
    max-height: 20px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
</style>