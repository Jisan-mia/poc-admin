<template>
  <div class="container">
    <div class="left">
      <div class="img__container">
        <img src="/images/placeholderImg.svg" alt="">
      </div>
    </div>
    <div class="right">
      <div class="right__inner">
        <AdminCustomInput label="Exam Pack Name" v-model="examPack.title" placeholder="Enter Exam Pack Name"/>
        <AdminCustomInput :isTextArea="true" :styles="{minHeight: '110px', resize: 'vertical'}" label="Detail" v-model="examPack.detail" placeholder="Enter Detail"/>

        <div class="select__cont">
          <div class="select">
            <label>Label</label>
            <select name="label" id="label" v-model="examPack.label" >
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
             <select name="batch" id="batch" v-model="examPack.batch" aria-placeholder="Select Batch">
              <option selected disabled value="">Select Batch</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>

        <div class="btn__cont" v-if="!isAdminExamPackCreate">
          <div class="btn__wrapper">
            <CustomAdminBtn type="primary" icon="fas fa-edit" @onClick="handleEditPack">
              Edit Exam Pack
            </CustomAdminBtn>  
          </div>
          <div class="btn__wrapper">
            <CustomAdminBtn type="danger" icon="fas fa-trash" @onClick="handleDeletePack">
              Delete Exam Pack
            </CustomAdminBtn>  
          </div>
          <div class="btn__wrapper">
            <CustomAdminBtn type="info" icon="fas fa-plus" @onClick="handleCreateExam ">
              Create an Exam
            </CustomAdminBtn>  
          </div>
          <div class="btn__wrapper">
            <CustomAdminBtn type="info"  @onClick="this.$emit('backExamPack') ">
              Back
            </CustomAdminBtn>  
          </div>
        </div>

        <div class="btn__cont"  v-if="isAdminExamPackCreate">
          <div class="btn__wrapper">
            <CustomAdminBtn type="info" icon="fas fa-plus" @onClick="handleAddExamPack ">
              Add Exam Pack
            </CustomAdminBtn>  
          </div>
          <div class="btn__wrapper">
            <CustomAdminBtn type="info"  @onClick="this.$emit('backExamPack') ">
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
export default {
  name: "AdminExamPackComp",
  props: {
    isAdminExamPackCreate: {
      type: Boolean,
      default: () => false
    },
    editExamPack: {
      type: Object
    }
  },
  setup(props) {
    const examPack = ref({
      title: '',
      detail: '',
      label: '',
      batch: '',
      image: ''
    })

    examPack.value = !props.isAdminExamPackCreate ? {...props.editExamPack} : {...examPack.value}

    const handleEditPack = () => {
      console.log('edit pack')
    }
    const handleDeletePack = () => {
      console.log('delete pack')
    }
    const handleCreateExam = () => {
      console.log('create exam')
    }


    const handleAddExamPack = () => {
      alert('new exam pack added')
    }

    
    return {
      examPack,
      handleEditPack,
      handleDeletePack,
      handleCreateExam,
      handleAddExamPack
    };
  },
  components: { AdminCustomInput, CustomAdminBtn }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 1rem;
  justify-content: center;
  justify-items: center;
  width: 100%;
  margin-top: 2.5rem;
  .left {
    width: 100%;
    max-width: 450px;
    .img__container{
      background: #CFCFCF;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 290px;
      img{
        max-width: 90px;
        width: 100%;
      }
    }
  }
  .right {
    width: 100%;
    max-width: 450px;
    &__inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 1rem;
    }

    .select__cont {
      display: flex; 
      align-items: center;
      gap: 0.8rem;
      justify-content: flex-start;
      width: 100%;
      

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
        min-width: 218px;
      }
    }
    .back__btn {
      min-width: 100px;
      max-width: 100%;
    }
  }
}
</style>