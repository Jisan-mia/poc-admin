<template>
  <div class="main__container">
    <div class="insert__section">
      <div class="input__cont">
        <AdminCustomInput 
          :placeholder="`Insert ${'Batch'}`" 
          :style="{
            borderRadius: '18px', 
            border: 'none',
            background: '#ebebeb',
            minWidth: '180px',
            width: '300px'
          }"
        />
      </div>
      <div class="btn__wrapper">
        <CustomAdminBtn 
          :rounded="true"
          :style="{
            borderRadius: '18px'
          }"
          type="info"
        >
          Add
        </CustomAdminBtn>
      </div>
    </div>

    <div class="output__section">
      <h3>Added {{'Batches'}} </h3>
      <div class="output__container">
        <div class="card" v-for="batch in batches" :key="batch">
          <div class="box">
            {{batch}}
          </div>
          <span class="delete__btn">
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
export default {
  name: "BatchSettingsComp",
  components: { AdminCustomInput, CustomAdminBtn },
  setup() {
    const batches = ref(['2021', '2022', '2023', '2024'])
    

    return {
      batches
    }
  }
}
</script>


<style lang="scss" scoped>
.main__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.8rem;

  .insert__section {

    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: flex-start;

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
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
      justify-content: flex-start;
      gap: 1rem;

      .card {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        min-width: 250px;
        .box {
          background-color: #ebebeb;
          border-radius: 18px;
          padding: 1.3rem 2.8rem;
          color: #727272;

          font-weight: bold;
          font-size: 1.2rem;
          line-height: 1.3rem;

        }
        .delete__btn {
          font-weight: bold;
          font-size: 3rem;
          line-height: 1.3rem;
          color: #727272;

        }
      }

    }

  }
}

</style>