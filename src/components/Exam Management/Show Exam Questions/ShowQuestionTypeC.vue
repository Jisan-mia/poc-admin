<template>
  <div class="type3">
    
    <div class="para__header">
      <!-- {{examQuestionC.paragraphHeader}} -->
      <!-- Read the description and answer below 2 question.. -->
      নিচের উদ্দীপকের আলোকে পরবর্তী দুটি প্রশ্নের উত্তর দাও:
    </div>
    <div class="img__container" v-if="examQuestionC.q_image">
      <img :src="imageUrl(examQuestionC.q_image)" alt="">
    </div>
    <div class="para">
      <!-- {{examQuestionC?.q_description}} -->
      <ShowCkContent :content="examQuestionC?.q_description" />
    </div>
    <div class="question" v-for="examQuestion in examQuestionC.otherQuestions" :key="examQuestion">

      <ShowQuestionTypeA :isViewAnswerSheet="isViewAnswerSheet" v-if="examQuestion.type == 'data_one'" :examQuestion="examQuestion" :index="examQuestion.index"/>
      <ShowQuestionTypeB :isViewAnswerSheet="isViewAnswerSheet" v-if="examQuestion.type == 'data_two'" :examQuestion="examQuestion" :index="examQuestion.index"  />

    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import ShowQuestionTypeA from "./ShowQuestionTypeA.vue";
import ShowQuestionTypeB from "./ShowQuestionTypeB.vue";
import ShowCkContent from './ShowCkContent.vue';
export default {
  name: "ShowQuestionTypeC",
  props: {
    examQuestionC: {
      type: Object
    }, 
    indexC: {
      type: [Number, String]
    },
    isViewAnswerSheet: {
      type: Boolean,
      default: () => false
    }
  },
  components: { ShowQuestionTypeA, ShowQuestionTypeB, ShowCkContent },
  setup(props) {
    // console.log(props.examQuestionC)
    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`)

    return {
      imageUrl
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/config.scss';

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
.type3 {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  .para__header, .para {
    @extend .pDefault;
    margin-bottom: 1.1rem;
  }

}
.question{
  margin-bottom: 0.7rem;
}
</style>