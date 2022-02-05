<template>
  <div class="container">
    <!-- dashboard profile start -->
    <!-- {{JSON.stringify(profile.Profile_image)}} -->
    <div class="profile">
      <div class="profile__info">

        <div class="img__container1" v-if="profile.Profile_image">
          <img :src="profile.Profile_image ? imageUrl(profile.Profile_image) : '/images/placeholderImg2.svg'" alt="">
        </div>

        <div class="profile__detail">
          <p class="basic">{{profile.board}} | {{profile.level}} {{profile.batch}}</p>
          <h3 class="name">{{profile.name}}</h3>
          <p class="institute">{{profile.institution}}</p>
        </div>
      </div>
      <!-- upcoming exams -->
      <div class="upcoming">
        <h3>Upcoming Exams</h3>
        <div class="upcoming__exams-container">
          <!-- boxes will be iterated form upcoming apis -->
          <p v-if="upcomingExams.length == 0">
            There is no upcoming exams
          </p>
          <div class="box" v-for="upcomingExam in upcomingExams" :key="upcomingExam.id">
            <UpcomingExamCard :upcomingExam="upcomingExam" @upcoming-exam="handleClickUpcomingExam" />
          </div>
        </div>
      </div>
    </div>
    <!-- dashboard profile end -->

    <!-- dashboard stats start -->
    <div class="stats">
      <div class="stats__chart">
      </div>

      <div class="stats__cards">
        <DashboardStatsCountCard label="Completed Exams" :value="`${completedExams}`"/>
        <DashboardStatsCountCard label="Average Mark" :value="`${Math.round(averageMark*100)/100}%`"/>
        <DashboardStatsCountCard label="Passed" :value="`${Math.round(passedPercentage*100)/100}%`"/>
        <DashboardStatsCountCard label="Failed" :value="`${Math.round(failedPercentage*100)/100}%`"/>
      </div>
    </div>
    <div class="detail">
      <h3 vi>Previous Exam</h3>
      <p v-if="previousExam.length === 0">You didn't take any exam yet</p>
      <table v-if="previousExam.length !== 0">
      <tbody>
        <tr>
          
          <td>
            <span>
              Exam ID
            </span>
          </td>
          <td>
            <span>
              Exam Name
            </span>
          </td>
          <td>
            <span>
              Score
            </span>
          </td>
          <td>
            <span>
              Negative Marking
            </span>
          </td>
          <td>
            <span>
              Answer Sheet
            </span>
          </td>
        </tr>
        

        <tr v-for="exam in previousExam" :key="exam.examId">
          

          <td class="id" > 
            
            <span>
              {{exam.exam_id}}
            </span>
          
          </td>
          <td class="exam_name">
            
            <span>
              {{strJoin(exam.Exam_name)}}
            </span>
          </td>

          <td class="scores">
            <span>
              {{`${exam.score}/${exam.total_mark}`}}
            </span>
          </td>

          <td class="scores">
            <span>
              {{exam.negative_marking}}
            </span>
          </td>

          <td class="answer__sheet">
            <span>
              View/Download
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import DashboardStatsCountCard from './DashboardStatsCountCard.vue'
import UpcomingExamCard from './UpcomingExamCard.vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    DashboardStatsCountCard,
    UpcomingExamCard
  },
  name: 'StudentDashboard', 
  setup() {
    const store = useStore();
    const router = useRouter();
    const route  = useRoute()

    const { studentId } = route.params;
    const allStudentList = computed(() => store.state.adminState.studentList);
    const studentWiseReportings = computed(() => store.state.reportingState.studentWiseReportings)


    const profile = computed(() => allStudentList.value.find(student => student.user == studentId));

    const previousExamReport = computed(() => {
      if(studentWiseReportings.value[profile.value.user]) {
        return studentWiseReportings.value[profile.value.user]
      } return []
    });



    const examLists = computed(() => store.state.examPackState.examLists);
    //console.log(examLists.value)
    
    const now = dayjs().format('YYYY-MM-DD hh:mm:ss A');

    const filterUpcoming = computed(() => examLists.value.filter(exam => {
      if(exam.level == profile.value.level) {
        const examDate = dayjs(exam.Exam_start_date + exam.Exam_start_time).format('YYYY-MM-DD hh:mm:ss A')
        if(dayjs(examDate).diff(now, 'hour') > 0) {
          return exam
        } return false;
      }
      
    }))

    const upcomingExams = computed(() => filterUpcoming.value.slice(Math.max(filterUpcoming.value.length-2, 1))) 
    //console.log(upcomingExams.value)

    const previousExam = [...previousExamReport.value];

    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`)


    const completedExams = computed(() => previousExamReport.value.length)
    // const completedExams = ref(0);
    const averageMark = computed(() => {
      if(previousExamReport.value.length === 0) {
        return 0;
      }
      const allAverages = previousExamReport.value.map(report => {
        return (Number(report.score)/Number(report.total_mark)) * 100
      })
      return allAverages.reduce((acc, currentAverage) => acc + currentAverage, 0) / allAverages.length;
    });

    const passedPercentage = computed(() => {
      if(previousExamReport.value.length === 0) {
        return 0;
      }
      const passed = previousExamReport.value.filter(report => report.score >= report.pass_mark).length || 0;
      return (passed/previousExamReport.value.length) * 100
    }) 

    const failedPercentage = computed(() => {
      return previousExamReport.value.length === 0 ? 0 : 100 - passedPercentage.value 
    });

    const handleClickUpcomingExam = (exam) => {
      // //console.log(exam)
    }



    const strJoin = (str) => {
      return str.split(' ').join('-')
    }
    return {
      previousExam,
      upcomingExams,
      handleClickUpcomingExam,
      strJoin,
      profile,
      imageUrl,
      completedExams,
      averageMark,
      passedPercentage,
      failedPercentage
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';


.container {
  @include flexVertical;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
}
.statsProfile_common {
  width: 100%;
  display: flex; 
  grid-template-columns: 2fr 1fr;
  gap: 1.2rem;
  justify-content: center;
  align-content: center;
  @include maxMedia(768px) {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;
  }


}
.profile {
  @extend .statsProfile_common;
  .profile__info {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.5rem;
    .img__container1{
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 18px;
      min-width: 120px;
      width: 180px;
      height: 180px;
      min-height: 120px;
      background: #dddddd;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
        border-radius: 18px;
      }
    }
    .profile__detail {
      @include flexVertical;
      align-items: flex-start;
      gap: 0.5rem;
      p{
        color: #000;
        font-size: 0.9rem;
      }
      .name {
        color: #00A9DC;;
        font-size: 1.8rem;
        line-height: 2.3rem;
        letter-spacing: 0.5px;
        white-space: nowrap;
        text-transform: capitalize;
        @include maxMedia(768px) {
          white-space: normal;
          text-align: left;
        }
      }
    }
    
  }
  .upcoming{
    width: 100%;
    @include flexVertical;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
    h3{
      color: #00A9DC;
      font-size: 1.3rem;
      line-height: 2rem;
      font-weight: 700;
    }
    &__exams-container{
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      grid-template-rows: max-content;
      grid-auto-rows: max-content;
      grid-gap:2rem 1.2em;
      flex: 1;
      justify-content: center;
      .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 0.8em;
      } 
    }
  }
}

.stats {
  @extend .statsProfile_common;
  &__chart {
    border: 1px solid #00A9DC;
    border-radius: 18px; 
    width: 100%;
    background: #eae7f7;
    padding: 0.5rem;
    min-height: 200px;
    @include maxMedia(768px) {
      padding: 0;
    }
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    width: 100%;
  }
}
.detail{
  @include flexVertical;
  justify-content: center;
  align-items: flex-start;
  gap: 0.3rem;
  margin-bottom: 2rem;
  width: 100%;
  @include maxMedia(768px) {
    overflow-x: scroll;
  }
  h3{
    color: #00A9DC;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 1.3rem;
  }
}
table {
  border-collapse: collapse;
  width: 100%;
  tbody tr{
    border-bottom: 1px solid #CDCDCD;
    display: grid;
    // grid-template-columns: 1fr 2fr 1.5fr 1.5fr 1.5fr;
    grid-template-columns: repeat(5, 1fr);
    // @include maxMedia(968px) {
    //   display: inherit;
    // }
    @include maxMedia(768px) {
      grid-template-columns: repeat(5, 200px);
    }

    &:first-child span{
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.2rem;
      letter-spacing: -0.011em;
      color: #00A9DC;
    }

    td span{
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.2rem;
      letter-spacing: 0.2px;
      color: #000;
    }
    td.answer__sheet span {
      text-decoration-line: underline;
      font-weight: 600;
      cursor: pointer;
    }
  
    
  }
  tr td{
    // border: 1px solid blue;
    text-align: left;
    padding:1rem 2rem 1rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @include maxMedia(968px) {
      padding: 0.5rem 0.9rem 0.5rem 0;
    }
    
  }

}

</style>