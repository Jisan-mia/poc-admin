<template>
  <div class="header__container">

    <div class="item1">
      <div class="exam__img">
        <img :src="imageUrl(currentExam.cover_photo)" alt="">
      </div>
    </div>

    <div class="item2">
      <h3> 
        {{currentExam.Exam_name}}
      </h3>
      <p>
        {{currentExam.details}}
      </p>
      <p>{{timeF(currentExam.Exam_end_date,currentExam.Exam_end_time)}} | {{dayName}}, {{endDate}}</p>
    </div>

    <div class="item3">
      <div>
        <h3>Assigned Student</h3>
        <div class="more__info">
          <div class="group">
            <p class="label">Batch</p>
            <p class="value">
              {{currentExam.level}}{{currentExam.batch}}
            </p>
          </div>
          <div class="group">
            <p class="label">
              Exam Pack
            </p>
            <p class="value">
              {{currentExamPack.ExamPack_name}}
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3>Marking</h3>
        <div class="more__info mark__info">
          <div class="group">
            <p class="label">Total Mark</p>
            <p class="value">
              {{currentExam.total_mark}}
            </p>
          </div>
          <div class="group">
            <p class="label">Per Question Mark</p>
            <p class="value">
              {{currentExam.mark_per_question}}
            </p>
          </div>
          <div class="group">
            <p class="label">Pass Mark</p>
            <p class="value">
              {{currentExam.pass_mark}}
            </p>
          </div>
        </div>
      </div>
      
    </div>

    <div class="item4">
      <div>
        <h4>Negative Marking: </h4>
        <span>
          <ToggleSwitch v-model="currentExam.isNegativeMarking" :disabled="true"/>
        </span>
      </div>
      <div class="negative__amount">
        <h4>Amounts Per Mistake: </h4>
        <div class="amount__box">
          <span> 
            {{currentExam.amount_per_mistake}}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import ToggleSwitch from "../ui/ToggleSwitch.vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import dayjs from "dayjs";
export default {
  name: "ExamPageExamDetail",
  components: { ToggleSwitch },
  setup(){
    const route = useRoute();
    const store = useStore();
    const examPacks = computed(() => store.state.examPackState.examPacks)
    const examLists = computed(() => store.state.examPackState.examLists)

    const { id } = route.params;
    //console.log({id})


    const currentExam = computed(() => examLists.value.find(exam => exam.id == id));

    // const currentExamPack = computed(() =>  examPacks.value.find(pack => pack.id == currentExam.value.id));
    const currentExamPack = computed(() =>  examPacks.value.find(pack => pack.id == currentExam.value.exam_pack));

    //console.log(currentExamPack.value)

    const endDate = computed(() => dayjs(currentExam.value.Exam_end_date).format('DD/MM/YYYY'))
    const endTime = currentExam.value.Exam_end_time;
  
    const days = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    const dayNum = computed(() => dayjs(currentExam.value.Exam_end_date.value).day())
    //console.log(dayNum.value)

    // days[dayNum.value]
    const timeF = computed(() => (date, time) => {
        const examDate = dayjs(date + time).format("YYYY-MM-DD hh:mm:ss A");
        return dayjs(examDate).format("hh:mm A");
    });


    const dayName = days.value[dayNum.value]

    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`)


    return {
      currentExam,
      currentExamPack,
      endDate,
      endTime,
      dayName,
      timeF,
      imageUrl

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
.header__container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.3rem;
  width: 100%;
  background: #FAF9F9;
  border-radius: 18px;

  .exam__img{
    background: #CFCFCF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
    width: 100%;
    height: 155px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      border-radius: 18px;
      object-fit: cover;
      background-position: center center;
    }
  }

  .item2{
    @include flexVertical;
    align-items: flex-start;
    justify-content: space-evenly;
    h3{
      font-weight: bold;
      font-size: 1.1rem;
      line-height: 25px;
      color: #00A9DC;
    }
    p{
      &:nth-child(odd) {
        font-size: 14px;
        line-height: 17px;
        color: #000000d3;
        font-weight: 500;
      
      }
      &:nth-child(even){
        font-size: 12px;
        line-height: 15px;
        color: #000000b3;
        font-weight: 500;
      }
    }
    
  }

  .item3{
    @include flexVertical;
    align-items: flex-start;
    justify-content: center;
    gap: 0.3rem;
    div h3{
      font-weight: bold;
      font-size: 16px;
      line-height: 18px;
      color: #00A9DC;
      margin-bottom: 0.3rem;
    }

    .more__info{
      display: flex;
      align-items: center;
      gap: 0.3rem;

      .group{
        @include flexVertical;
        gap: 0.2rem;
        .label{
          font-weight: normal;
          font-size: 10px;
          line-height: 11px;
          letter-spacing: -0.011em;
          color: #000000;
        }
        .value {
          font-size: 10px;
          letter-spacing: -0.011em;
          color: #000000;
          border: 1px solid #00A9DC;
          box-sizing: border-box;
          border-radius: 5px;
          padding:  0.4rem 0.8rem;
        }
      }
    }
    .mark__info{
      .group {
        .label {
          font-size: 9px;
          line-height: 10px;
        }
        .value {
          border-radius: 0;
          text-align: center;
          padding: 0.3rem 1.1rem
        }
      }
    }
  }

  .item4{
    @include flexVertical;
    align-items: flex-start;
    justify-content: center;
    gap: 0.7rem;
    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.5rem;
      h4{
        font-weight: bold;
        font-size: 0.9rem;
        line-height: 16px;
        letter-spacing: -0.011em;
        color: #00A9DC;
      }
    }
    .negative__amount{
      h4 {
        color: #000000;
      }
      .amount__box {
          border: 1px solid #00A9DC;
          box-sizing: border-box;
          padding: 0.3rem 0.6rem;
          @include flexCenter;
          span {
            color: #000000;
            font-weight: 500;
            font-size: 0.8rem;
          }
      }

    }
    
    div.infos p{
      font-size: 13px;
      line-height: 15px;
      letter-spacing: -0.011em;
      color: #000000c7;
      font-weight: 500;
      margin: 0.2rem 0;
    }

    .view__btn {
      border: none;
      outline: none;
      background: #FF6F00;
      color: #fff;
      padding: 7px 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 14px;
    }
  }
  


}
</style>