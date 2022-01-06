<template>
 
    <div class="img__container">
      <img src="/images/placeholderImg.svg" alt="">
    </div>
    <div class="text">
      <h3 @click="$emit('examCardClick', exam)"> {{exam.name}} </h3> 

      <p>
        Batch {{exam.date}} 
      </p>
    </div>  
</template>

<script>
export default {
  name: "ExamCard",
  props: {
    exam: {
      type: Object
    }
  },
  emits: ['examCardClick'],
  setup(props) {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

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
  }
  .img__container img{
    max-width: 77px;
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