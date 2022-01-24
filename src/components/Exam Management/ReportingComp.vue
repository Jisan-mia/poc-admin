<template>
  <header>
    <div class="header__input">
      <input v-model="idSearch" type="text" placeholder="Search With Exam ID" name="" id="">
      <!-- <input type="datetime-local" name="" id="" placeholder="Date Range"> -->
      <select name="level" id="level" v-model="selectedLevel">
        <option selected disabled value="">Level</option>
        <option value="all">All Level</option>
        <option value="HSC">HSC</option>
        <option value="SSC">SSC</option>
        <option value="O-level">O-Level</option>
      </select>
    </div>
  </header>
  <div class="table__main">
  <table>
    <tbody>
      <tr>
        
        <td>
          <span>
            Exam ID
          </span>
        </td>
        <td>
          <span>
            Subject
          </span>
        </td>
        <td>
          <span>
            Data & Time
          </span>
        </td>
        <td>
          <span>
            Highest Score
          </span>
        </td>
        <td>
          <span>
            Average Mark
          </span>
        </td>
      </tr>
      

      <tr v-for="report in reports" :key="report.examId">
        

        <td class="id" > 
            <span @click="handleSpecificReportShow(report,cutHash(report.exam_id))">

              {{report.exam_id}}
            </span>
         
        </td>
        <td class="subject">
            <span>
              {{report.Exam_name}}
            </span>
        </td>
        <td>
          <div class="date__time">
            <span class="date">
              {{dateF(report.Exam_start_date)}} <!-- changed from Exam_end_date -->

            </span>
            <span class="time">
              {{timeF(report.Exam_start_date, report.Exam_start_time)}}

            </span>
          </div>
        </td>

        <td class="highest">
          <span>
            {{report.highestMark}}/{{report.total_mark}}
          </span>
        </td>
        <td class="average">
          <span>
            {{report.averageP.toFixed(2)}}%
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';
import dayjs from 'dayjs'
export default {
  name: 'ReportingComp',
  setup() {
    const route = useRoute();
    const router = useRouter()
    const store = useStore();
    const selectedLevel = ref('');
    const idSearch = ref('')
    const reportsD = computed(() => store.state.reportingState.reportings)

    const reports = computed(() => {
      if(idSearch.value || selectedLevel.value) {
        let allReportsMain = ref(reportsD.value)
        // console.log(allReportsMain.value)
        if(idSearch.value) {
           allReportsMain.value = allReportsMain.value.filter(report => {
            return idSearch.value.toLowerCase().split(' ').every(v => report.exam_id.toLowerCase().includes(v)) 
          })
        } 
        if(selectedLevel.value) {
            allReportsMain.value = allReportsMain.value.filter(report => {
              if(selectedLevel.value == 'all') return report
              return report.level.toLowerCase().includes(selectedLevel.value.toLowerCase())
            })
        }
        return allReportsMain.value

      } else {
        return reportsD.value
      }
    })





    const cutHash = computed(() => (id) => id.split('').filter(c => c == '#' ? false : c).join(''))


    const timeF = computed(() => (date, time) => {
        const examDate = dayjs(date + time).format("YYYY-MM-DD hh:mm:ss A");
        return dayjs(examDate).format("hh:mm A");
    });
    const dateF = computed(() => (date) => {
      return dayjs(date).format('DD/MM/YYYY');
    });


    const handleSpecificReportShow = (report,exam_id) => {
      const routeData = {
        name: 'SpecificExamReport',
        params: {
          examId: exam_id
        }
      }
      router.push(routeData)
    }




    return {
      reports,
      timeF,
      dateF,
      idSearch,
      selectedLevel,
      cutHash,
      handleSpecificReportShow
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
.table__main{
  width: 100%;
  margin-bottom: 2rem;
  @include maxMedia(768px) {
    overflow-x: scroll;
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
    @include maxMedia(968px) {
      grid-template-columns: repeat(5, 150px);

    }

    &:first-child{
      border: none;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.2rem;
      letter-spacing: 0.2px;
      color: #9FA2B4;
    }

    .id span, .subject span, .highest, .average{
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.2rem;
      letter-spacing: 0.2px;
      text-decoration-line: underline;
      color: #00335C;
      cursor: pointer;
    }
    .highest, .average {
      font-weight: 500;

      color: #000;
      cursor: default;
      text-decoration-line: none;
    }
    .subject span{
      color: #000;
    }
    .date__time{
      @include flexVertical;
      justify-content: center;
      align-items: flex-start;  
      
      color: #454545;
      font-size: 0.7rem;
      .date{
        margin-bottom: 0.3rem;
        color: #000;
        font-size: 0.88rem;
      }
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
  tr td:nth-child(2) {
    // grid-column: span 2
    min-width: 215px;
  }

}
.header__input{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 180px);
  justify-content: flex-start;
  align-content: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
  @include maxMedia(768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))
  }

  input, select {
    border: 1px solid #00a9dc;

    box-sizing: border-box;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 0.9rem;
    outline: none;
    padding: 0.7rem 1rem;
    width: 100%;
    &::placeholder{
      color: #696969;
    }
  }
  select{
    text-align: left;
  }
  
}
</style>