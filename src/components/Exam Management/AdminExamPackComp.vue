<template>
  <div class="container">
    <div class="left">
      <div class="img__container" :class="{img__create: isAdminExamPackCreate && !previewImage}">
        <img :src="previewImage ? previewImage : typeof examPack.pack_image == 'string' && examPack.pack_image ? imageUrl(examPack.pack_image) : '/images/placeholderImg.svg'" alt="">
        <span>
          <ImgInputModel v-model="examPack.pack_image" @imagInput="handleIInput"/>
        </span>

      </div>
    </div>
    <div class="right">
      <div class="right__inner">
        <AdminCustomInput label="Exam Pack Name" v-model="examPack.ExamPack_name" placeholder="Enter Exam Pack Name"/>
        <AdminCustomInput :isTextArea="true" :styles="{minHeight: '110px', resize: 'vertical'}" label="Detail" v-model="examPack.details" placeholder="Enter Detail"/>

        <div class="select__cont">
          <div class="select">
            <label>Level</label>
            <select name="level" id="level" v-model="examPack.level" >
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
            <CustomAdminBtn type="danger" icon="fas fa-trash" @onClick="handleDeletePack(examPack.id)">
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
import { computed, ref } from '@vue/reactivity';
import AdminCustomInput from "./AdminCustomInput.vue"
import CustomAdminBtn from '../ui/CustomAdminBtn.vue';
import ImgInputModel from '../ui/ImgInputModel.vue';
import { getNotification } from '../../api/common';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
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
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    // const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') ? img : `https://www.exam.poc.ac${img}`)
    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`)

    const examPack = ref({
      ExamPack_name: '',
      pack_image: '',
      details: '',
      batch: '',
      level: ''
    })

    examPack.value = !props.isAdminExamPackCreate ? {...props.editExamPack} : {...examPack.value}

    // console.log(examPack.value)


    

    // validate field 
    const isValid = () => {
      const isValid = ref(true)
      for(let key in examPack.value) {
        if(examPack.value[key] == '') {
          isValid.value = false
          store.dispatch('notifications/add',getNotification('warning', `${key} is empty`))
          break; 
        }
        else if (key == 'ExamPack_name' && examPack.value.ExamPack_name.length < 3) {
          store.dispatch('notifications/add',getNotification('warning', 'Pack name must be at least 3 character'))
          isValid.value = false
          break;
        } else if (key == 'details' && examPack.value.details.length < 5) {
          store.dispatch('notifications/add',getNotification('warning', 'Pack details must be at least 5 character'))
          isValid.value = false
          break;
        } else {
          isValid.value = true;
        }
      }
      return isValid.value;
    }






    //  edit an exam pack
    const handleEditPack = async () => {
      console.log('edit pack')
      if(isValid()) {
        console.log('valid')

        try{
          await store.dispatch('examPackState/updateExamPack', {...examPack.value})
          await store.dispatch('examPackState/loadExamPacks')

          ctx.emit('backExamPack')
        } catch(err) {
          console.log(err)
        }
      }
    }

    // delete an exam pack
    const handleDeletePack = async (packId) => {
      console.log('delete pack')
      try{
        await store.dispatch('examPackState/deleteExamPack', packId )
        await store.dispatch('examPackState/loadExamPacks')

        ctx.emit('backExamPack')
      } catch(err) {
        console.log(err)
      }
    }

    // add exam pack
    const handleAddExamPack =async () => {
      console.log('new exam pack added')
      if(isValid()) {
          try{
          await store.dispatch('examPackState/createExamPack', {...examPack.value})
          await store.dispatch('examPackState/loadExamPacks')
          ctx.emit('backExamPack')
        } catch(err) {
          console.log(err)
        }
      }
    }

    // create an exam
    const handleCreateExam = () => {
      store.commit('examPackState/setIsCreateExamFromPack', true)
      router.push('/exam-management')
    }




    const previewImage = ref(null)

    const handleIInput = (e) => {
      console.log(e)
      previewImage.value = e;
    }

    
    return {
      examPack,
      handleEditPack,
      handleDeletePack,
      handleCreateExam,
      handleAddExamPack,
      imageUrl,
      previewImage,
      handleIInput
    };
  },
  components: { AdminCustomInput, CustomAdminBtn, ImgInputModel }
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