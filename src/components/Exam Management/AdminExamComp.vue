<template>
  <div class="examContainer">
    <div class="left">
      <div class="img__container">
        <img src="/images/placeholderImg.svg" alt="">
      </div>
      <AdminCustomInput v-model="examInfo.name" placeholder="Enter Exam Name"/>
      <AdminCustomInput :isTextArea="true" :styles="{minHeight: '110px', resize: 'vertical'}" v-model="examInfo.detail" placeholder="Enter Exam Detail"/>
      
      <div class="time">
          <label for="startTime"  class="time__label">
              <input type="datetime-local" value="2000-01-01T00:00:00" name="startTime" id="startTime" placeholder="Select Date & time">  
          </label>
          

          <label for="endTime" class="time__label">
            <input type="datetime-local" name="endTime" id="endTime" placeholder="Select Date & time"> 
          </label>
        
      </div>
    </div>
    <div class="right">
      <div class="right__inner">
        <div class="assign">
          <h3>Assign Student</h3>
          <div class="select__cont">
            <div class="select">
              <label>Level</label>
              <select name="label" id="label" v-model="examInfo.level" >
                <option selected disabled value="">Select Label</option>
                <option value="JSC">JSC</option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
                <option value="O-Label">O-Label</option>   
                <option value="A-Label">A-Label</option>
              </select>
            </div>
            
            <div class="select">
              <label>Batch</label>
                <select name="batch" id="batch" v-model="examInfo.batch">
                <option selected disabled value="">Select Batch</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>

            <div class="select">
              <label>Exam Pack</label>
                <select name="examPack" id="examPack" v-model="examInfo.examPack" >
                <option selected disabled value="">Select Exam Pack</option>
                <option value="elite exam pack1">elite exam pack</option>
                <option value="elite exam pack2">elite exam pack2</option>
                <option value="elite exam pack3">elite exam pack3</option>
              </select>
            </div>
          </div>
        </div>

        <div class="marking">
          <h3>Marking</h3>
          <div class="input__cont">
            <AdminCustomInput label="Total" v-model="examInfo.totalMark" placeholder="Enter Total Mark"/>
            <AdminCustomInput label="Per Question Mark" v-model="examInfo.questionMark" placeholder="Per Question Mark"/>
            <AdminCustomInput label="Pass Mark" v-model="examInfo.passMark" placeholder="Enter Pass Mark"/>
          </div>
        </div>


        <div class="switches">
          <h3>Randomization</h3>
          <div class="switch">
            <ToggleSwitch v-model="examInfo.randomization" />
          </div>
        </div>

        <div class="switches">
          <h3>Sorting</h3>
          <div class="switch">
            <ToggleSwitch v-model="examInfo.sorting" />
          </div>
        </div>

        <div class="switches">
          <h3>Negative Marketing</h3>
          <div class="switch">
            <ToggleSwitch v-model="examInfo.negativeMarking" />
          </div>
        </div>

        <div class="switches">
          <h3>Exam Total Time(Min)</h3>
          <div class="totalTime">
            30
          </div>
        </div>


       

        <div class="btn__cont" v-if="!isExamManageCreate">
          <div class="btn__wrapper">
            <CustomAdminBtn type="primary" icon="fas fa-edit" @onClick="handleEditExam">
              Edit Exam Info
            </CustomAdminBtn>  
          </div>
          <div class="btn__wrapper">
            <CustomAdminBtn type="primary" icon="fas fa-edit" @onClick="handleQuestionEditor">
              Question Editor
            </CustomAdminBtn>  
          </div>
          <div class="btn__wrapper">
            <CustomAdminBtn type="info" icon="fas fa-trash" @onClick="handleDeleteExam">
              Delete Exam
            </CustomAdminBtn>  
          </div>
          <div class="btn__wrapper">
            <CustomAdminBtn type="info"  @onClick="this.$emit('backExam') ">
              Back
            </CustomAdminBtn>  
          </div>
        </div>

        <div class="btn__cont"  v-if="isExamManageCreate">
          <div class="btn__wrapper">
            <CustomAdminBtn type="info" icon="fas fa-plus" @onClick="handleCreateExam ">
              Create an Exam
            </CustomAdminBtn>  
          </div>
          <div class="btn__wrapper">
            <CustomAdminBtn type="primary" icon="fas fa-edit" @onClick="handleQuestionEditor">
              Question Editor
            </CustomAdminBtn>  
          </div>
          <div class="btn__wrapper">
            <CustomAdminBtn type="info"  @onClick="this.$emit('backExam') ">
              Back
            </CustomAdminBtn>  
          </div>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import AdminCustomInput from "./AdminCustomInput.vue"
import CustomAdminBtn from '../ui/CustomAdminBtn.vue';
import ToggleSwitch from '../ui/ToggleSwitch.vue';
import { watchEffect } from '@vue/runtime-core';
export default {
  name: "AdminExamComp",
  props: {
    isExamManageCreate: {
      type: Boolean,
      default: () => false
    },
    editExam: {
      type: Object
    }
  },
  setup(props, context) {
    const examInfo = ref({
      name: '',
      date: '',
      detail: '',
      level: "",
      batch: "",
      examPack: "",
      totalMark: '',
      questionMark: '',
      passMark: '',
      amountPerQuestion: '',
      randomization: false,
      sorting: true,
      negativeMarking: false,
      startTime: '',
      endTime: "",
      totalTime: "",
    })

    examInfo.value = !props.isExamManageCreate ? {...props.editExam} : {...examInfo.value}

    const handleEditExam = () => {
      console.log('edit exam')
    }
    const handleQuestionEditor = () => {
      console.log('question editor')
      context.emit('onQuestionEditor')
    }
    const handleCreateExam = () => {
      console.log('create exam')
    }

    const handleDeleteExam = () => {
      console.log('delete exam')
    }

    watchEffect(() => {
      console.log(examInfo.value.randomization)
      console.log(examInfo.value.sorting)
      console.log(examInfo.value.negativeMarking)
    })

    
    return {
      examInfo,
      handleEditExam,
      handleQuestionEditor,
      handleCreateExam,
      handleDeleteExam
    };
  },
  components: { AdminCustomInput, CustomAdminBtn, ToggleSwitch }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
.examContainer {
  display: grid;
  grid-template-columns: 1.25fr 2fr;
  gap: 2rem;
  justify-content: center;
  justify-items: center;  
  align-items: flex-start;
  width: 100%;

  @include maxMedia(768px) {
    grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));

  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.5rem;
    width: 100%;
    .img__container{
      background: #CFCFCF;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 200px;
      img{
        max-width: 90px;
        width: 100%;
      }
    }

    .time {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      width: 100%;
      &__label {
        position: relative;
      }

      input {
        border: 1.8px solid #00A9DC;
        box-sizing: border-box; 
        outline: none;
        font-size: 1.03rem;
        width: 100%;
        max-width: 300px;
        padding: 1rem 1.2rem;
      }
    }
  }
  .right {
    width: 100%;
    &__inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 1.7rem;
      
    }
    
    h3 {
      color: #00A9DC;
      font-weight: bold;
      font-size: 1.4rem;
      line-height: 1.5rem;
      letter-spacing: -0.011em;
    }
    .assign, .marking {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .switches {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;

      .switch {
        display: inline-flex;
      }

    }

    .common {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 0.8rem;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
    }

    .input__cont {
      @extend .common;
    }
    .select__cont {
      @extend .common;
      
        .select {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        label {
          margin-bottom: 0.4rem;
          font-size: 0.9rem;
          color: #000;
        }
        select {
          width: 100%;
          height: 100%;
          outline: none;
          border: 1.8px solid #00A9DC;
          font-size: 1rem;
          padding:  1rem;
        }
      }
    }

    .btn__cont {
      margin-top: 1.3rem;
      display: flex; 
      align-items: center;
      gap: 0.8rem;
      justify-content: flex-start;
      width: 100%;
      flex-wrap: wrap;
      .btn__wrapper{
        min-width: 180px;
      }
    }
    .back__btn {
      min-width: 100px;
      max-width: 100%;
    }
  }
}
</style>