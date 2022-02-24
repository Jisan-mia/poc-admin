<template>
  <div class="cont" >
    <span class="circle" > 
      <span :class="selected == option.ans ? 'innerCircle' : 'notIn'">

      </span>
    </span>
    <span class="content" :class="option.is_correct
                                        ? selected == option.ans && 'rightAns' 
                                        : selected == option.ans && 'wrongAns'
     ">
      <ShowCkContent :content="option.ans" />
    </span>
  </div>
</template>

<script>
import ShowCkContent from '../Exam Management/Show Exam Questions/ShowCkContent.vue';

export default {
  name: 'AnswerSheetRadio',
  components: { ShowCkContent },
  props: {
    option: {
      type: Object
    },
    selected: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.cont {
  font-size: 1.12rem;
  font-weight: 400;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.7em;
  align-items: center;
  cursor:default;
  transition: all 0.3s linear;
  color: hsla(0, 0%, 0%, 0.9);

  .circle {
    background-color: #ccc;
    color: #ccc;
    width: 22px;
    height: 22px;
    border: 1px solid #ccc;
    border-radius: 50%;
    display: grid;
    place-content: center;
    .innerCircle {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color:  #00B066;
    }
    .notIn {
      display: none;
    }
  }
  
  .content {

  }
  .rightAns {
    background: #0080000f;
    color: green;
    padding: 5px 8px;
    border-radius: 3px;
  }
  .wrongAns {
    background: #ff00000f;
    color: red;
    padding: 5px 8px;
    border-radius: 3px;
  }
}
</style>