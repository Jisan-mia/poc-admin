<template>
  <div class="login_cont">
    <h3>
      Admin Login
    </h3>

    <form @submit.prevent="handleUserLogin">
      <CustomPhoneInput v-model="userAuthInput.phoneNumber" placeholder="Enter your phone number" />
      <CustomAuthInput v-model="userAuthInput.password" placeholder="Enter your password" type="text"/>

      <CustomLoginRegisterBtn  buttonText="Login" />
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
export default {
  components: { CustomAuthInput, CustomPhoneInput, CustomLoginRegisterBtn },
  name: 'LoginMain',
  setup() {
    const store = useStore();
    const router = useRouter()
    const user = computed(() => store.state.user)
    console.log(user.value)

    console.log(user.value.password)
    const userAuthInput = ref({
      phoneNumber: '',
      password: ''
    })


    const handleUserLogin = () => {
      console.log('handle user login func called')
      router.push('/dashboard')
    } 

    return {
      userAuthInput,
      handleUserLogin,
    }
  }
}
</script>

<style lang="scss" scoped>
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
    line-height: 110px;
    text-align: center;
    background: linear-gradient(45.01deg, #146AB4 9.93%, #00D4FE 88.64%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    // margin: 0;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    text-align: center;
    width: 400px;
    min-width: 200px;
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