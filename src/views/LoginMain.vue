<template>
  <div class="login_cont">
    <h3>
      Admin Login
    </h3>

    <form @submit.prevent="handleUserLogin">
      <CustomPhoneInput v-model="userAuthInput.phone_number" placeholder="Enter your phone number" />
      <div class="cont">
        <CustomAuthInput v-model="userAuthInput.password" placeholder="Enter your password"  :type="inputType"/>
        <span class="btn" @click="showPassword = !showPassword" v-if="!showPassword" >
          <i class="fas fa-eye-slash" ></i>
        </span>

        <span class="btn" @click="showPassword = !showPassword" v-else-if="showPassword"  >
          <i class="fas fa-eye" ></i>
        </span>
      </div>

      <!-- <CustomLoginRegisterBtn  buttonText="Login" /> -->
      <CustomLoginRegisterBtn  buttonText="Login" :isSpin="buttonLoading"/>

    </form>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import CustomAuthInput from '@/components/Auth Components/CustomAuthInput.vue'
import CustomPhoneInput from '@/components/Auth Components/CustomPhoneInput.vue'
import CustomLoginRegisterBtn from '@/components/ui/CustomLoginRegisterBtn.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getNotification } from '../api/common'
export default {
  components: { CustomAuthInput, CustomPhoneInput, CustomLoginRegisterBtn },
  name: 'LoginMain',
  setup() {
    const store = useStore();
    const router = useRouter();
    const showPassword = ref(false)
    const buttonLoading = ref(false)

    const inputType = computed(() => showPassword.value ? "text" : "password")


    
    const userAuthInput = ref({
      phone_number: '',
      password: ''
    })

    const error = ref(null)


    const handleUserLogin = async () => {
      if(!/^(?:\+88|01)?(?:\d{11}|\d{13})$/.test(userAuthInput.value.phone_number)){
        store.dispatch('notifications/add', getNotification('warning', 'Please enter a valid phone number'))
        return;
      } else if(userAuthInput.value.password.length < 5 ) {
        store.dispatch('notifications/add', getNotification('warning', 'Password must be at least 5 character'))
        return;
      }
      try {
        buttonLoading.value = true
        await store.dispatch('adminState/userLogin', {
          ...userAuthInput.value
        })
        buttonLoading.value = false
        router.push('/')
      } catch(err) {
        console.log(err.message);
        setTimeout(() => {
          buttonLoading.value = false
        }, 1000);
        error.value = err.message;
      }
      
    } 

    return {
      userAuthInput,
      handleUserLogin,
      buttonLoading,
      inputType,
      showPassword
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';

.cont{
  position: relative;
  input {
    width: 90% !important;
  }

  .btn {
    border: none;
    outline: none;
    position: absolute;
    top: 38%;
    right: 4%;
    border: 0;
    z-index: 2;
    cursor: pointer;
    background-color: #fff;
    width: 30px;
  }

  }
.login_cont {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // gap: 1.8rem;
  margin: 0 1rem;

  h3{
    margin: 1.6rem 0;
    font-style: normal;
    font-weight: bold;
    font-size: 3rem;
    line-height: 3.1rem;
    text-align: center;
    background: linear-gradient(45.01deg, #146AB4 9.93%, #00D4FE 88.64%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    // margin: 0;
    @include maxMedia(768px) {
     font-size: 1.5rem;
     line-height: 1.8rem;
     margin: 1rem 1.5rem;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    text-align: center;
    width: 400px;
    min-width: 150px;
    @include maxMedia(500px) {
      width: 100%;
      margin-top: 15px;
    }
    p {
      color: #00325B;
      font-size: 1rem;
      line-height: 24px;
      .special {
        cursor: pointer;
        color: #00325a;
        text-decoration-line: underline;
        font-weight: bold;
      } 
    }
  }
}


</style>