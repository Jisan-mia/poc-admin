<template>
  <div class="top__section">
    <div class="select">
      <CustomSelect
        v-model="selectedPack"
        :options="examPackList"
        :style="selectStyle"
        placeholder="Exam Pack"
      />
    </div>

    <div class="select">
      <CustomSelect
        v-model="selectedExam"
        :options="examList"
        :style="selectStyle"
        placeholder="Exam"
      />
    </div>

  </div>

  <div class="questionComp">
    <CreateQuestionComp />
  </div>

  <div class="wrapper">
    <CustomAdminBtn type="primary" icon="fas fa-plus" @onClick="handleAddAnotherQuestion" :rounded="true" >
       Add Question 
    </CustomAdminBtn>
  </div>

  
</template>

<script>
import CustomSelect from "../../ui/CustomSelect.vue";
import { ref } from '@vue/reactivity';
import CreateQuestionComp from "./CreateQuestionComp.vue";
import CustomAdminBtn from "../../ui/CustomAdminBtn.vue";
export default {
  name: "CreateAllExamQuestion",
  components: { CustomSelect, CreateQuestionComp, CustomAdminBtn },
  setup() {
    const selectStyle = {
      borderRadius: '10px', 
      fontSize: '1rem',
      padding:  '1rem',
      backgroundColor:'#E4E4E4',
      border: 'none'
    }

    const examPackList = ref(['Elite Exam Pack1', 'Elite Exam Pack2', 'Elite Exam Pack3']);
    const examList = ref(['Physics 1st chapter', 'Physics 2nd chapter', 'Force Chapter'])
    const selectedExam = ref('')
    const selectedPack = ref('');


    const handleAddAnotherQuestion = () => {
      console.log('create another question')
    }
    return {
      selectStyle,
      examList,
      examPackList,
      selectedExam,
      selectedPack,
      handleAddAnotherQuestion
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
  }
    
}
.wrapper {
  margin: 2rem 0;
  max-width: 250px;
}
</style>