<template>
  <AnswerSheetRadio
    v-for="option in options" 
    :key="option.id" 
    :option="option"
    :selected="selected"
   />
</template>

<script>
import AnswerSheetRadio from "./AnswerSheetRadio.vue";
export default {
  props: {
    options: {
      type: Array
    },
    selected: {
      type: String
    }
  },
  setup(props) {

    return {

    }
  },
  components: { AnswerSheetRadio }
}
</script>

<style scoped lang="scss">

</style>