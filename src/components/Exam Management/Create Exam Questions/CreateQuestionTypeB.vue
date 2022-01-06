<template>
  <div class="question__inner">

    <div class="question" v-if="!isFromTypeC">
      <div class="question__top" >
        <p>উদ্দীপক...</p>
        <div class="img__cont">
          <!-- <img src="/images/addQuestionImg.svg" alt=""> -->
          <InputImgComp @input="handleImgInput" />
        </div>
      </div>

      <div class="qBottom">
        <AdminCustomInput 
          :isTextArea="true"
          placeholder="উদ্দীপক..."
          v-model="questionTypeTwo.paragraph"
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
        নিচের তথ্যগুলো লক্ষ করঃ
      </p>
      <div class="hints__option">
        <ul>
          <li v-for="key in Object.keys(questionTypeTwo.hintsOption)" :key="key">
            <span>
              {{key}}.
            </span>
            <AdminCustomInput
              v-model="questionTypeTwo.hintsOption[key]"
              :placeholder="questionTypeTwo.hintsOption[key]"
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
      <p>
        <!-- {{questionTypeTwo.optionsHeader}} -->
        নিচের কোনটি সঠিকঃ
      </p>

      <div class="options">
      <CustomRadioButton
        v-for="option in questionTypeTwo.options"
        :key="option"
        :option="option"
        name='type1'
        v-model="questionTypeTwo.correctAns"
      />
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
  name: "CreateQuestionTypeB",
  components: { CustomSelect, AdminCustomInput, CustomRadioButton, CustomAdminBtn, QuestionCreateBtns, InputImgComp },
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
  setup(props) {
    console.log(props.questionTypeTwo);
    
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

  .hints {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 1rem;
    width: 100%;

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
  }
  .option__cont{
    @extend .options;
    margin: 1rem 0;
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