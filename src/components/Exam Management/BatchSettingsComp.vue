<template>
  <div class="main__container">
    <div class="insert__section">
      <div class="input__cont">
        <AdminCustomInput 
          :placeholder="`Insert ${placeholder}`" 
          :style="{
            borderRadius: '18px', 
            border: 'none',
            background: '#ebebeb',
            textTransform: 'capitalize'
          }"
          v-model="optionInput"
        />
      </div>
      <div class="btn__wrapper">
        <CustomAdminBtn 
          :rounded="true"
          :style="{
            borderRadius: '18px'
          }"
          type="info"
          @onClick="handleAddOption(placeholder, optionInput)"
        >
          Add
        </CustomAdminBtn>
      </div>
    </div>

    <div class="output__section">
      <h3>Added {{`${placeholder}s`}} </h3>
      <div class="output__container">
        <div class="card" v-for="option in allOptions" :key="option.id">
          <div class="box">
            {{option[placeholder.toLowerCase()]}}
          </div>
          <span class="delete__btn" @click="deleteBatchItem(option)">
            &times;
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminCustomInput from "./AdminCustomInput.vue";
import CustomAdminBtn from "../ui/CustomAdminBtn.vue";
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { getNotification } from "../../api/common";
export default {
  name: "BatchSettingsComp",
  components: { AdminCustomInput, CustomAdminBtn },
  props: {
    placeholder: {
      type: String
    },
    allOptions: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore()
    const optionInput = ref('')
    const mainOptions = props.allOptions
    const deleteBatchItem = async (option) => {
      console.log(option)
      try {
        await store.dispatch('batchSettings/deleteItemFromBatchSettings', option.id)
        await store.dispatch('batchSettings/loadBatchSettings')

      } catch (err) {
        console.log(err)
      }
    }


    const handleAddOption = async (placeholder, option) => {
      console.log(placeholder, option)
      if(!option) {
        store.dispatch('notifications/add', getNotification('warning', 'Input cannot be empty'))
        return
      }
      const key= placeholder.toLowerCase()

      const data = {
        [key]: option
      }

      const isExist = props.allOptions.find((item) => item[key] == option)
      console.log(isExist)
      if(isExist?.[key]) {
        store.dispatch('notifications/add', getNotification('warning', 'Item already exist'))
        return
      }


      try {
        await store.dispatch('batchSettings/addItemToBatchSettings', data)
        await store.dispatch('batchSettings/loadBatchSettings')

      } catch (err) {
        console.log(err)
      }
    }
    

    return {
      mainOptions,
      deleteBatchItem,
      handleAddOption,
      optionInput
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/styles/config.scss';
.main__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;

  .insert__section {

    display: flex;
    gap: 1.15rem;
    align-items: center;
    justify-content: flex-start;

    .input__cont{
      min-width: 310px;
      
      @include maxMedia(600px) {
        min-width: 150px;

      }
    }
    .btn__wrapper{
      min-width: 120px;
      width: 160px;
    }
  }

  .output__section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.9rem;
    width: 100%;

    h3 {
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 1.4rem;
      color: #00A9DC;
    }
    .output__container {
      width: 100%;
      gap: 1.15rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;


      .card {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        min-width: 280px;
        max-width: 100%;  
        .box {
          background-color: #ebebeb;
          border-radius: 18px;
          padding: 1.3rem 2.8rem;
          color: #727272;
          text-transform: capitalize;

          font-weight: bold;
          font-size: 1.2rem;
          line-height: 1.3rem;

          
          @include maxMedia(600px) {
            padding: 1rem 2.5rem


          }

        }
        .delete__btn {
          font-weight: bold;
          font-size: 3rem;
          line-height: 1.3rem;
          color: #727272;
          cursor: pointer;

        }
      }

    }

  }
}

</style>