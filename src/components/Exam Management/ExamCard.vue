<template>
 
    <div class="img__container">
      <img :src="exam.cover_photo ? imageUrl(exam.cover_photo) : '/images/placeholderImg.svg'" alt="">
    </div>
    <div class="text">
      <h3 @click="$emit('examCardClick', exam)"> {{exam.Exam_name}} </h3> 

      <p>
        {{timeF(exam.Exam_start_date,exam.Exam_start_time)}} | {{dayName}}, {{startDate}}
      </p>
    </div>  
</template>

<script>
import dayjs from 'dayjs';
import { computed, ref } from '@vue/reactivity';
export default {
  name: "ExamCard",
  props: {
    exam: {
      type: Object
    }
  },
  emits: ['examCardClick'],
  setup(props) {
    const currentExam = props.exam;
    // console.log(currentExam, currentExam.Exam_start_date)
    


    const startDate = computed(() => dayjs(currentExam.Exam_start_date).format('DD/MM/YYYY'))
  
    
  
    const days = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    const dayNum = computed(() => dayjs(currentExam.Exam_start_date).day())
    //console.log(dayNum.value)

    const timeF = computed(() => (date, time) => {
        const examDate = dayjs(date + time).format("YYYY-MM-DD hh:mm:ss A");
        return dayjs(examDate).format("hh:mm A");
    });

    const dayName = days.value[dayNum.value]
    //console.log(dayName)

    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') ? img : `https://www.exam.poc.ac${img}`)


    return {
      timeF,
      dayName,
      startDate,
      imageUrl

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
  .outlined{
    border-radius: 23px;
  }
  .notOutlined {
    border-radius: 0px;
  }
  .img__container{
    background: #CFCFCF;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 180px;
    @include maxMedia(768px) {
      height: 155px;
    }
  }
  .img__container img{
    // max-width: 77px;
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
    color: #000;
    font-weight: 500;
    line-height: 17px;
    margin-top: 0.3rem;
  }

</style>