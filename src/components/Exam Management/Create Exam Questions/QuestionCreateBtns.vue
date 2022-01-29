<template>
  <div class="btns">
    <button class="delete" @click="$emit('onQuestionDelete')">
      <i class="far fa-trash-alt fa-2x"></i>
      <span>Delete Question</span>
    </button>

    <div class="wrapper">
      <CustomAdminBtn type="info" :rounded="true" @click="!isNewQ ? $emit('onQuestionEdit') : $emit('onQuestionSave')">
        {{isNewQ ? 'Save' : 'Edit'}}
      </CustomAdminBtn>
    </div>
  </div>
</template>

<script>
import CustomAdminBtn from "../../ui/CustomAdminBtn.vue";
export default {
  name: "QuestionCreateBtns",
  components: { CustomAdminBtn },
  props: {
    isNewQ: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-top: 1.5rem;
  .wrapper{
    min-width: 150px;
  }
  .delete {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    outline: none;
    cursor: pointer;
    background: inherit;
    
    font-weight: 500;

    i.far {
      color: red;
      width: 28px;
    }
    span {
      color: red;
      font-size: 1.1rem;
      margin-left:0.5rem;
      text-decoration: underline;
    }
  }
}
</style>