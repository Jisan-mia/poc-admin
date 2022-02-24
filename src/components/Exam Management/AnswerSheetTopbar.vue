<template>
  <header>
    <div class="img_container">
      <img src="@/assets/poc_logo.svg" alt="">
      <div>

      </div>
    </div>

    <div class="timer">
      <p>Timestamp</p>
      <h3>
        <!-- <span>{{0}}</span><span>: </span>
        <span>{{12}}</span> <span>:</span>
        <span>{{10}}</span> -->
        <span>
          {{timestamp}}
        </span>
      </h3>
      
    </div>

  </header>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
import dayjs from 'dayjs'

export default {
  name: "AnswerSheetTopBar",
  setup() {
    const route = useRoute();
    const store = useStore();
    // const examLists = computed(() => store.state.examPackState.examLists);
    const examLists = computed(() => store.state.reportingState.reportings);

    const { id } = route.params;

    const currentExam = computed(() => examLists.value.find(exam => exam.id == id));
    // console.log(currentExam.value)

    const timestamp = computed(() => {
      const fullDate =  dayjs(currentExam.value.Exam_end_date+currentExam.value.timestamp).format('YYYY-MM-DD hh:mm:ss A');
      // console.log(fullDate)
      return dayjs(fullDate).format("hh:mm:ss A")
    })





   


    return {
      timestamp
    };
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.7rem;
  
  @include maxMedia(768px) {
    padding: 1rem;
  }
  .img_container {
    max-width: 150px;
    @include maxMedia(500px) {
      max-width: 120px;
    }
    img{
      width: 100%;
    }
  }

}
.timer {
  background: linear-gradient(45.01deg, #146AB4 9.93%, #00D4FE 88.64%);
  color: #fff;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  
  text-align: center;

  p{
    font-size: 0.71rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
  }
  h3 span{
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 24px;
    letter-spacing: 0.5px;
    margin: 0.1rem;
    @include maxMedia(500px) {
      font-size: 1.3rem;
        line-height: 1.5rem;
    }
  }
}
</style>