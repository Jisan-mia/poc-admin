<template>
 
    <div class="img__container" :class="[outline ? 'notOutlined' : 'outlined']">
      <img :src="imageUrl(examPack.pack_image)" alt="Exam Pack Image">
    </div>
    <div class="text">
      <h3 @click="$emit('examPackClick', examPack)"> {{examPack.ExamPack_name}} </h3> 

      <p>
        Batch {{examPack.batch}} 
      </p>
    </div>  
</template>

<script>
import { computed } from '@vue/reactivity';
export default {
  name: "ExamPackCard",
  props: ['examPack', 'outline', 'isExam'],
  emits: ['examPackClick'],
  setup(props) {
    const examPack = props.examPack
    const titleToUrl = title => title.trim().toLowerCase().split(' ').join('-');
    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') ? img : `https://www.exam.poc.ac${img}`)

    return {
      examPack,
      titleToUrl,
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
    line-height: 17px;
  }

</style>