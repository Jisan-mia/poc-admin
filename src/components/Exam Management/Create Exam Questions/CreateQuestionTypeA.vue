<template>
  <div class="question__inner">

    <div class="question">
      <div class="question__top">
        <p>প্রশ্ন...</p>
        <div class="img__cont" v-if="!isFromTypeC">
          <InputImgComp @input="handleImgInput" />
        </div>
      </div>

      <div class="qBottom">
        <AdminCustomInput 
          :isTextArea="true"
          placeholder="প্রশ্ন..."
          v-model="questionTypeOne.question"
          :style="{
            minHeight: '120px',
            resize: 'vertical'
          }"
          />
      </div>
    </div>


<!-- <span :style="{maxWidth: '300px'}">
      {{JSON.stringify(questionTypeOne)}}
  </span>     -->

    <div class="options">

      <div class="option" v-for="(option, index) in questionTypeOne.options" :key="index">
        <span class="radio">
          <CustomRadioButton
            :option="questionTypeOne.options[index]"
            name='type1'
            v-model="questionTypeOne.correctAns"
            :isEditOption="true"
          />
        </span>
        <span class='input__elm'>
          <AdminCustomInput 
            :placeholder="questionTypeOne.options[index]"
            v-model="questionTypeOne.options[index]"
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

    <QuestionCreateBtns v-if="!isFromTypeC" />
    
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import CustomSelect from '../../ui/CustomSelect.vue';
import AdminCustomInput from '../AdminCustomInput.vue';
import CustomRadioButton from '../../ui/CustomRadioButton.vue';
import CustomAdminBtn from '../../ui/CustomAdminBtn.vue';
import QuestionCreateBtns from './QuestionCreateBtns.vue';
import InputImgComp from '../../ui/InputImgComp.vue';
export default {
  name: "CreateQuestionTypeA",
  components: { CustomSelect, AdminCustomInput, CustomRadioButton, CustomAdminBtn, QuestionCreateBtns, InputImgComp },
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
  setup(props) {
    console.log(props.questionTypeOne)
    const handleImgInput = (img) => {
      props.questionTypeOne.img = img
    }
    return {
handleImgInput
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

  
}



</style>