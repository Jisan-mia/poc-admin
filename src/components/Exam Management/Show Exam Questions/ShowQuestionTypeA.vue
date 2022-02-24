<template>
  <div class="one_main">
    <div class="img__container" v-if="examQuestion?.q_image">
      <img :src="imageUrl(examQuestion.q_image)" alt="">
    </div>
    <div class="question__cont">

    <div class="sl">
      <!-- {{index}}. -->
    </div>
    <div class="question">
      <p>
        <span>
          {{index}}.
        </span>
        <ShowCkContent :content="examQuestion.question_name" />
        <!-- {{examQuestion.question_name}} -->
      </p>
      
      <div class="options" v-if="isViewAnswerSheet">
        <AnswerSheetRadioGroup 
          :options="examQuestion.options"
          :selected="examQuestion.selectedAns"
        />
      </div>


      <span class="correct_ans" v-if="isViewAnswerSheet">
        Correct Ans: <span>
          <ShowCkContent :content="examQuestion.options.find(item => item.is_correct == true).ans"/>
        </span>
      </span>
      
    </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { watch, watchEffect } from '@vue/runtime-core';
import ShowCkContent from './ShowCkContent.vue';
import AnswerSheetRadio from '../../ui/AnswerSheetRadio.vue';
import AnswerSheetRadioGroup from '../../ui/AnswerSheetRadioGroup.vue';
export default {
  name: "ShowQuestionTypeA",
  props: {
    examQuestion: {
      type: Object
    },
    index: {
      type: Number
    },
    isViewAnswerSheet: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`)

    return {
      imageUrl
    };
  },
  components: { ShowCkContent, AnswerSheetRadio, AnswerSheetRadioGroup }
}
</script>

<style scoped lang="scss">
@import '@/styles/config.scss';

.one_main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.img__container{
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 190px;
  max-width: 400px;
  overflow: hidden;
  display: block;
  align-self: center;
  @include maxMedia(768px) {
    max-width: 100%;
    height: 200px;
  }
}
.img__container img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-position: center center;
  border-radius: 5px;
}

.pDefault {
  font-size: 1rem;
  color: rgb(0 0 0 / 70%);
  line-height: 1.25rem;
  font-weight: 500;
}
.question__cont {
  display: flex;
  // justify-content: space-between;
  align-items: flex-start;
  gap: 0.3rem;
  p{
    @extend .pDefault;
    display: flex;
    gap: 0.4rem;
    align-items: baseline;
  }
  .question {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;



    .options{
      list-style-type: none;
      @include flexVertical;
      gap: 0.4rem;
      justify-content: center;
      margin-left: 1rem;
    }

    .correct_ans {
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      gap: 0.5rem;
      span {
        background: #0080000f;
        color: green;
        padding: 5px 8px;
        border-radius: 3px;
        font-weight: 500;
      }
    }
  }

}
</style>