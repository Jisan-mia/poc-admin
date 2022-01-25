<template>
  <div class="questionCont">
    <div class="inner">
      <div class="question__area">
        <component :is="comp" v-bind="compProps" @onSaveQuestion="handleSaveQ"/>
      </div>

      <div class="selection__area">
        <div class="selection__inner"> 
          <CustomSelect 
            :options="typeOptions"
            v-model="typeSelected"
            :style="{
              borderRadius: '10px', 
              fontSize: '1rem',
              padding:  '1rem',
              backgroundColor:'#E4E4E4',
              border: 'none'
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import CustomSelect from '../../ui/CustomSelect.vue';
import AdminCustomInput from '../AdminCustomInput.vue';
import CustomRadioButton from '../../ui/CustomRadioButton.vue';
import CustomAdminBtn from '../../ui/CustomAdminBtn.vue';
import CreateQuestionTypeA from './CreateQuestionTypeA.vue';
import CreateQuestionTypeB from './CreateQuestionTypeB.vue';
import CreateQuestionTypeC from './CreateQuestionTypeC.vue';
import { v4 as uuidv4 } from 'uuid';

import { watchEffect } from '@vue/runtime-core';

export default {
  name: "CreateQuestionComp",
  props: {
    examPack: {
      type: Number,
    },
    examName: {
      type: Number
    }
  },
  components: { CustomSelect, AdminCustomInput, CustomRadioButton, CustomAdminBtn, CreateQuestionTypeA,CreateQuestionTypeB, CreateQuestionTypeC },
  setup(props) {

    const typeOptions = ref(['Type 01', 'Type 02', 'Type 03']);
    const typeSelected = ref('Type 01')


    const comp = ref('CreateQuestionTypeA')
    watchEffect(() => {
      comp.value = 
        typeSelected.value === 'Type 01' 
          ? 'CreateQuestionTypeA' 
          : typeSelected.value === 'Type 02'
          ? 'CreateQuestionTypeB'
          : 'CreateQuestionTypeC'
    })
    const examPack = props.examPack;
    const examName = props.examName;

    const questionTypeOne = ref({
      uuid: uuidv4(),
      exam_pack: examPack,
      exam_name: examName,
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

    

    

    const questionTypeTwo = ref({
      img: '',
      correctAns: '',
      type: "B",
      paragraph: "",
      hintsHeader: "নিচের তথ্যগুলো লক্ষ করিঃ",
      hintsOption: {
        i: "" ,
        ii: "" ,
        iii: "" ,
      },         
      optionsHeader: "নিচের কোনটি সঠিকঃ",
      options: [
          "i & ii",
          "ii & iii",
          "i & iii",
          "i, ii, iii"
      ],
    })

    const questionTypeThree = ref({
      img: '',
      type: "C",
      paragraphHeader: "Answer the below 2 questions following the paragraph",
      paragraph: "",
      questions: [
        {
          type: "A",
          correctAns: '',
          question: "",
          options: [
              "Option1",
              "Option2",
              "Option3",
              "Option4"
          ],
        },
        {
          type: "B",
          correctAns: '',
          hintsHeader: "Follow below information",
          hintsOption: {
              i: "",
              ii: "",
              iii: "",
          },
          optionsHeader: "Which option is true",
          options: [
              "i & iii",
              "i & ii",
              "ii & iii",
              "i, ii, iii"
          ],
        }
      ]
  });

    const compProps = computed(() => {
      if(comp.value === 'CreateQuestionTypeA') {
        return {
          questionTypeOne: questionTypeOne.value
        }
      } else if (comp.value === 'CreateQuestionTypeB') {
        return {
          questionTypeTwo: questionTypeTwo.value
        }
      } else if (comp.value === 'CreateQuestionTypeC') {
        return {
          questionTypeThree: questionTypeThree.value
        }
      } 
    })


    const handleSaveQ = (question, type) => {
      console.log('save from main')
      console.log(question, type)
    }
    return {
      typeOptions,
      typeSelected,
      comp,
      compProps,
      handleSaveQ
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/config.scss';
.questionCont {
  background: #F4F4F4;
  border-radius: 35px;
  padding: 3.5rem;
  .inner {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 5em;
    justify-content: start;
    width: 100%;
    @include maxMedia(768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
  }
    @include maxMedia(768px) {
      padding: 1.65rem;
    }

  
  .question__area {
    width: 100%;
    min-height: 340px;
  }


  .selection__area {
    width: 100%;
    min-width: 250px;
    max-width: 260px;
    
    @include maxMedia(768px) {
      grid-row: 1;
      max-width: inherit;
    }
  }
}
</style>