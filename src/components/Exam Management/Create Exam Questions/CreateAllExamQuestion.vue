<template>
  <div class="top__section">
    <div class="select">
      <!-- <CustomSelect
        v-model="selectedPack"
        :options="examPackList"
        :style="selectStyle"
        placeholder="Exam Pack"
      /> -->

      <select name="examPack" id="examPack" v-model="selectedExamPack">
        <option selected disabled value="">Exam Pack</option>
        <option v-for="pack in examPacks" :key="pack.id" :value="pack.id">
          {{pack.ExamPack_name}}
        </option>
      </select>
    </div>

    <div class="select">
      <select name="examList" id="examList" v-model="selectedExam">
        <option selected disabled value="">Exam</option>
        <option v-for="exam in examList" :key="exam.id" :value="exam.id">
          {{exam.Exam_name}}
        </option>
      </select>
    </div>
  </div>

  <div class="questionComp" v-if="selectedExamPack && selectedExam">
    <CreateQuestionComp :examPack="+selectedExamPack" :examName="+selectedExam" />
  </div>

  <div class="wrapper"  v-if="selectedExamPack && selectedExam">
    <CustomAdminBtn type="primary" icon="fas fa-plus" @onClick="handleAddAnotherQuestion" :rounded="true" >
       Add Question 
    </CustomAdminBtn>
  </div>

  
</template>

<script>
import CustomSelect from "../../ui/CustomSelect.vue";
import { computed, ref } from '@vue/reactivity';
import CreateQuestionComp from "./CreateQuestionComp.vue";
import CustomAdminBtn from "../../ui/CustomAdminBtn.vue";
import { useStore } from 'vuex';
import { watch, watchEffect } from '@vue/runtime-core';
export default {
  name: "CreateAllExamQuestion",
  components: { CustomSelect, CreateQuestionComp, CustomAdminBtn },
  setup() {
    const store = useStore();
    const selectedExamPack = ref('')
    const selectedExam = ref('')
    const selectStyle = {
      borderRadius: '10px', 
      fontSize: '1rem',
      padding:  '1rem',
      backgroundColor:'#E4E4E4',
      border: 'none'
    }

    // const examPackList = ref(['Elite Exam Pack1', 'Elite Exam Pack2', 'Elite Exam Pack3']);
    // const examList = ref(['Physics 1st chapter', 'Physics 2nd chapter', 'Force Chapter']);

    const examPacks = computed(() => store.state.examPackState.examPacks);
    const examListD = computed(() => store.state.examPackState.examLists);

    const examList = computed(() => {
      if(selectedExamPack.value) {
        return examListD.value.filter(exam => exam.exam_pack == +selectedExamPack.value);
      } return examListD.value
    })

    watchEffect(() => {
      if(selectedExamPack.value) {
        selectedExam.value = ''
      }
    })

    const handleAddAnotherQuestion = () => {
      console.log('create another question')
    }
    return {
      selectStyle,
      examList,
      handleAddAnotherQuestion,
      examPacks,
      selectedExamPack,
      selectedExam
    };
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';

.top__section {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
  .select {
    min-width: 100px;
    width: 250px;
    max-width: 300px;

    select {
      border-radius: 10px;
      font-size: 1rem;
      padding:  1rem;
      background-color:#E4E4E4;
      border: none
    }
  }

    
}
.wrapper {
  margin: 2rem 0;
  max-width: 250px;
}
</style>