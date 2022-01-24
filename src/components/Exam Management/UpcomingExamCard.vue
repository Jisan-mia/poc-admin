<template>
 
    <div class="img__container">
      <img :src="upcomingExam.cover_photo" alt="">
    </div>
    <div class="text">
        <h3 @click="$emit('upcoming-exam', upcomingExam)"> {{upcomingExam.Exam_name}} </h3> 
      <p>
        {{startTime}} | {{dayName}}, {{startDate}}
    </p>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { computed, ref } from '@vue/reactivity'
export default {
  name: "UpcomingExamCard",
  props: ['upcomingExam'],
  emits: ['upcoming-exam'],
  setup(props) {
    const upcomingExam = props.upcomingExam
    
    const startDate = computed(() => dayjs(upcomingExam.Exam_start_date).format('DD/MM/YYYY'))
    const examDate = dayjs(upcomingExam.Exam_start_date + upcomingExam.Exam_start_time).format('YYYY-MM-DD hh:mm:ss A')

    const startTime = dayjs(examDate).format('hh:mm A')
    
    const days = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    const dayNum = computed(() => dayjs(upcomingExam.Exam_start_date).day())

    console.log(dayNum.value)
    const dayName = days.value[dayNum.value]
    console.log(dayName)


    const titleToUrl = title => title.trim().toLowerCase().split(' ').join('-')
    return {
      upcomingExam,
      titleToUrl,
      startDate,
      dayName,
      startTime
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
  
  .img__container{
    background: #CFCFCF;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 130px;
    max-width: 180px;
    overflow: hidden;
    @include maxMedia(768px) {
      max-width: 100%;
      height: 200px;
    }
  }
  .img__container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-position: center center;
    
  }
  .text{
    text-align: left;

    h3{
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 25px;
    text-decoration: underline;
    color: #00A9DC;
    cursor: pointer;
  }
  }
  .text p{
    font-size: 0.9rem;
    margin-top: .3rem;
    color: #000;
    line-height: 17px;
  }

</style>