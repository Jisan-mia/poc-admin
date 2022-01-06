<template>
  <div v-if="currentCompState === 'examManagement'">
    <div class="container">
      <div class="wrapper">
        <CustomAdminBtn type="info" icon="fas fa-plus" @onClick="handleCreateExam" >
        <span> Create an Exam </span>
        </CustomAdminBtn>
      </div>
      <h3 class="name">Upcoming Exams</h3>
    <div class="pack_container">
      <div v-for="exam in upcomingExam" :key="exam.id"  class="card" >
        <ExamCard  @examCardClick="onUpcomingExamCardClick" :exam="exam"/>
      </div>
      </div>
    </div>
  </div>
  <span v-else-if="currentCompState === 'isExamManageCreate'">
    <AdminExamComp :isExamManageCreate="true"  @backExam="handleBack" @onQuestionEditor="handleQuestionEditor"/>
  </span>

  <span v-else-if="currentCompState === 'isExamManageEdit'">
    <AdminExamComp :editExam="editExam"  @backExam="handleBack" @onQuestionEditor="handleQuestionEditor"/>
  </span>

  <span v-else-if="currentCompState === 'questionEditor'">
    <CreateAllExamQuestion />
  </span>

</template>
<script>
import { ref } from '@vue/reactivity'
import CustomAdminBtn from '../../components/ui/CustomAdminBtn.vue'
import ExamCard from '../../components/Exam Management/ExamCard.vue'
import AdminExamComp from '../../components/Exam Management/AdminExamComp.vue'
import CreateAllExamQuestion from '@/components/Exam Management/Create Exam Questions/CreateAllExamQuestion.vue'

export default {
  name: "AdminExamManagement",
  props: {

  },
  components: {
    CustomAdminBtn,
    ExamCard,
    AdminExamComp,
    CreateAllExamQuestion
},
  setup() {
    const upcomingExam = ref([
        {
          id: 1, 
          name: 'Chemistry 1st Paper',
          date: '10:30 AM | Sunday, 19/10/2021',
detail: "This is exam detail. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reiciendis mollitia et, officia alias dolorum quisquam minus dolor odio autem!",
level: "HSC",
batch: "2021",
examPack: "elite exam pack3",
totalMark: 20,
questionMark: 1,
passMark: 10,
amountPerQuestion: 0.5,
randomization: true,
sorting: false,
negativeMarking: false,
startTime: '',
endTime: "",
totalTime: "40",


        },{
          id: 2, 
          name: 'Physics 1st Paper',
          date: '10:30 AM | Sunday, 19/10/2021',
          detail: "This is exam detail. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reiciendis mollitia et, officia alias dolorum quisquam minus dolor odio autem!",
          level: "HSC",
          batch: "2021",
          examPack: "elite exam pack3",
          totalMark: 20,
          questionMark: 1,
          passMark: 10,
          amountPerQuestion: 0.5,
          randomization: true,
          sorting: false,
          negativeMarking: false,
          startTime: '',
          endTime: "",
          totalTime: "40",


        },{
          id: 3, 
          name: 'Physics 2nd Paper',
          date: '10:30 AM | Sunday, 19/10/2021',
          detail: "This is exam detail. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reiciendis mollitia et, officia alias dolorum quisquam minus dolor odio autem!",
          level: "HSC",
          batch: "2021",
          examPack: "elite exam pack3",
          totalMark: 20,
          questionMark: 1,
          passMark: 10,
          amountPerQuestion: 0.5,
          randomization: true,
          sorting: false,
          negativeMarking: false,
          startTime: '',
          endTime: "",
          totalTime: "40",
        },{
          id: 4, 
          name: 'Chemistry 2nd Paper',
          date: '10:30 AM | Sunday, 19/10/2021',
          detail: "This is exam detail. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reiciendis mollitia et, officia alias dolorum quisquam minus dolor odio autem!",
          level: "HSC",
          batch: "2021",
          examPack: "elite exam pack3",
          totalMark: 20,
          questionMark: 1,
          passMark: 10,
          amountPerQuestion: 0.5,
          randomization: true,
          sorting: false,
          negativeMarking: false,
          startTime: '',
          endTime: "",
          totalTime: "40",

        },
      ])
     
    const currentCompState = ref('examManagement') // examManagement | isExamManageEdit | isExamManageCreate | questionEditor
    const handleCreateExam = () => {
      currentCompState.value = 'isExamManageCreate';
    }

    const editExam = ref(null)
    const onUpcomingExamCardClick = (exam) => {
      // console.log('clicked', examPack)
      editExam.value = {...exam};
      currentCompState.value = 'isExamManageEdit';
    }

    const handleBack = () => {
      currentCompState.value = 'examManagement'

    }

    const handleQuestionEditor = () => {
      currentCompState.value = 'questionEditor'
    }


    return {
      editExam,
      handleBack,
      upcomingExam,
      onUpcomingExamCardClick,
      handleCreateExam,
      currentCompState,
      handleQuestionEditor
    }
  }
}

</script>


<style scoped >

.container{
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
}
.wrapper {
  max-width: 380px;
}
.name {
  color: #00A9DC;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 1.9rem;
  margin-bottom: -0.6rem;
  margin-top: 0.8rem;
}

.pack_container{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-template-rows: max-content;
  grid-auto-rows: max-content;
  grid-gap:2rem 1.2em;
  flex: 1;
  justify-content: center;
}
.pack_container::after{
  content: "";
  display: block;
  grid-column-start: 1;
  height: 1em;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.8em;
}

.primary-btn{
  border: none;
  outline: none;
  padding: 1rem 1.2rem;;
  border-radius: 1rem;
  background: #00A9DC;
  color: #fff;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.3rem;
  text-align: center;
  cursor: pointer;
}
.flex-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}

</style>

