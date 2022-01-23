<template>
  <div class="examContainer">
    <div class="left">

      <div class="img__container" :class="{img__create: isExamManageCreate && !previewImage}">
        <img :src="previewImage ? previewImage : examInfo.cover_photo ? imageUrl(examInfo.cover_photo) : '/images/placeholderImg.svg'" alt="">
        <span>
          <ImgInputModel v-model="examInfo.cover_photo" @imagInput="handleIInput"/>
        </span>
      </div>

      <AdminCustomInput v-model="examInfo.Exam_name" placeholder="Enter Exam Name"/>
      <AdminCustomInput :isTextArea="true" :styles="{minHeight: '110px', resize: 'vertical'}" v-model="examInfo.details" placeholder="Enter Exam Detail"/>
      
      <div class="time">
          <label for="Exam_start_time"  class="time__label">
             <input v-model="examInfo.Exam_start_time" type="time" id="Exam_start_time" name="Exam_start_time" required>
          </label>

          <label for="Exam_start_date"  class="time__label">
             <input v-model="examInfo.Exam_start_date" type="date" id="Exam_start_date" name="Exam_start_date" required>
          </label>
          

          <label for="Exam_end_time"  class="time__label">
             <input v-model="examInfo.Exam_end_time" type="time" id="Exam_end_time" name="Exam_end_time" required>
          </label>

          <label for="Exam_end_date"  class="time__label">
             <input :min="examInfo.Exam_start_date" v-model="examInfo.Exam_end_date" type="date" id="Exam_end_date" name="Exam_end_date" required>
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
              <select name="examInfo" id="examInfo" v-model="examInfo.exam_pack">
                <option selected disabled value="">Select Exam Pack</option>
                <option v-for="pack in examPacks" :key="pack.id" :value="pack.id">
                  {{pack.ExamPack_name}}
                </option>
               
              </select>
            </div>
          </div>
        </div>

        <div class="marking">
          <h3>Marking</h3>
          <div class="input__cont">
            <AdminCustomInput label="Total" v-model="examInfo.total_mark" placeholder="Enter Total Mark" type="number"/>
            <AdminCustomInput label="Per Question Mark" v-model="examInfo.mark_per_question" placeholder="Per Question Mark" type="number"/>
            <AdminCustomInput label="Pass Mark" v-model="examInfo.pass_mark" placeholder="Enter Pass Mark" type="number"/>
          </div>
        </div>


        <div class="switches">
          <h3>Randomization : </h3>
          <div class="switch">
            <ToggleSwitch v-model="examInfo.isRandomized" />
          </div>
        </div>

        <div class="switches">
          <h3>Sorting : </h3>
          <div class="switch">
            <ToggleSwitch v-model="examInfo.isSorted" />
          </div>
        </div>

        <div class="switches ngMark1">
          <h3>Negative Marketing : </h3>
          <div class="switch ngMark">
            <ToggleSwitch v-model="examInfo.isNegativeMarking" />
            <div class="negativeMark" v-if="examInfo.isNegativeMarking">
              <p>Amount per mistake</p>
              <AdminCustomInput 
                :style="{maxHeight: '35px', maxWidth: '80px', textAlign: 'center'}" 
                v-model="examInfo.amount_per_mistake" type="number"/>
            </div>
          </div>
        </div>

        <div class="switches">
          <h3>Exam Total Time(Min) : </h3>
          <div class="totalTime">
            <AdminCustomInput 
              :style="{maxHeight: '42px', textAlign: 'center'}" 
              v-model="examInfo.exam_total_time" type="number"/>
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
            <CustomAdminBtn type="info" icon="fas fa-trash" @onClick="handleDeleteExam(examInfo.id)">
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
import { computed, ref } from '@vue/reactivity';
import AdminCustomInput from "./AdminCustomInput.vue"
import CustomAdminBtn from '../ui/CustomAdminBtn.vue';
import ToggleSwitch from '../ui/ToggleSwitch.vue';
import { watchEffect } from '@vue/runtime-core';
import ImgInputModel from '../ui/ImgInputModel.vue';
import { useStore } from 'vuex';
import { getNotification } from '../../api/common';
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
    const store = useStore();
    const examPacks = computed(() => store.state.examPackState.examPacks);
    
    const examInfo = ref({
      cover_photo: '',
      Exam_name: '', // (Char filed data any kind of)
      details: '',
      Exam_start_time: '',
      Exam_start_date: '',
      Exam_end_time: '',
      Exam_end_date: '',
      level: '',
      batch: '',
      exam_pack: '',  //in this section we have to be need examInfo ID
      total_mark: 0,
      mark_per_question: 0,
      pass_mark: 0,
      exam_total_time: '',

      isRandomized: false,
      isSorted: false,
      isNegativeMarking: false,
      amount_per_mistake: 0,
    })

    examInfo.value = !props.isExamManageCreate ? {...props.editExam} : {...examInfo.value}


    // validate field 
    const isValid = () => {
      const isValid = ref(true)
      for(let key in examInfo.value) {
        if(examInfo.value[key] == '') {
          if(key == 'amount_per_mistake' || key == 'isNegativeMarking' || key == 'isRandomized' || key == 'isSorted') {
            continue;
          }
          isValid.value = false
          store.dispatch('notifications/add', getNotification('warning', `${key} is empty`))
          break; 
        }
        else if (key == 'Exam_name' && examInfo.value.Exam_name.length < 3) {
          store.dispatch('notifications/add',getNotification('warning', 'Exam name must be at least 3 character'))
          isValid.value = false
          break;
        } else if (key == 'details' && examInfo.value.details.length < 5) {
          store.dispatch('notifications/add',getNotification('warning', 'Exam details must be at least 5 character'))
          isValid.value = false
          break;
        } else if (key == 'isNegativeMarking' && examInfo.value.isNegativeMarking && !examInfo.value.amount_per_mistake) {
          store.dispatch('notifications/add',getNotification('warning', 'Please add amount per mistake'))
          isValid.value = false
          break;
        } else {
          isValid.value = true;
        }
      }
      return isValid.value;
    }


    //  edit an exam
    const handleEditExam =  async () => {
      console.log('edit exam')
      if(isValid()) {

        try {
          await store.dispatch('examPackState/editAnExam', {...examInfo.value});
          await store.dispatch('examPackState/loadExamLists');
          
          context.emit('backExam')
          

        } catch(err) {
          console.log(err)
        }

      }
    }

    // to question editor
    const handleQuestionEditor = () => {
      console.log('question editor')
      context.emit('onQuestionEditor')
    }

    // create an exam
    const handleCreateExam = async () => {
      console.log('create exam')
      
      if(isValid()) {
          try{
          await store.dispatch('examPackState/createAnExam', {...examInfo.value})
          await store.dispatch('examPackState/loadExamLists')
          
          context.emit('backExam')

        } catch(err) {
          console.log(err)
        }
      }
    }

    // delete an exam
    const handleDeleteExam = async (examId) => {
      console.log('delete exam')
      try{
        await store.dispatch('examPackState/deleteAnExam', examId )
        await store.dispatch('examPackState/loadExamLists')

        context.emit('backExam')

      } catch(err) {
        console.log(err)
      }
    }

    watchEffect(() => {
      // 
    })

    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') ? img : `https://www.exam.poc.ac${img}`)


    const previewImage = ref(null)

    const handleIInput = (e) => {
      console.log(e)
      previewImage.value = e;
    }
    
    return {
      examInfo,
      handleEditExam,
      handleQuestionEditor,
      handleCreateExam,
      handleDeleteExam,
      previewImage,
      handleIInput,
      imageUrl,
      examPacks
    };
  },
  components: { AdminCustomInput, CustomAdminBtn, ToggleSwitch, ImgInputModel }
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
      position: relative;
      // background: #CFCFCF;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      // height: 290px;
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-position: center center;
      }

      span{
        position: absolute;
        bottom: 0;
        right: 0;
        top:0;
        left: 0;
        cursor: pointer;

        input {
          position: absolute;
          /* top: 0; */
          opacity: 0;
          inset: 0;
          width: 100%;
          cursor: pointer;
        }
      }

    }

    .img__create {
      background: #CFCFCF;
      height: 290px;
      img{
        max-width: 77px;
        width: 100%;
      }

    }

    .time {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 200px);
      justify-content: center;
      align-items: center;
      gap: 1.5rem;

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
      .switch.ngMark {
        place-items: center;
        .negativeMark {
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
          margin-left: 1.8rem;

          p{
            font-weight: 600;
            font-size: 0.8rem;
          }
        }
      }
      

      .totalTime {
        max-width: 80px;
      }

    }
    .ngMark1 {
      min-height: 52.88px;
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