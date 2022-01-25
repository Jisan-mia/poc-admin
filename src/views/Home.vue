<template>
    <!-- <router-link :to='{name: "LoginRegister"}'>
      <h2>
        Go to Login/register
      </h2>
    </router-link> -->

      <Login v-if="!isAuthenticated"/>

</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { watchEffect, watch, onMounted } from '@vue/runtime-core';
import Login from './Login.vue';
import AdminDashboard from './Admin/AdminDashboard.vue';
export default {
  name: "Home",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => store.state.adminState.user.isAuthenticated);
    console.log("homie", isAuthenticated.value)
    // router.go();

    watch(isAuthenticated.value, () => {
      router.go();
    })

    
   

    onMounted(() => {
      if(isAuthenticated.value) {
        console.log('logged')
        router.push({path: '/dashboard'});
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        store.commit('userState/initializeStore')
      }
    })



    return {
        isAuthenticated,
    };
  },
  components: { AdminDashboard, Login }
};
</script>
<style lang="scss" scoped>
.home{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h2{
    font-size: 1.8rem;
    background: rgb(99, 99, 226);
    color: white;
    display: inline-block;
    padding: 1rem 1.5rem;
    border-radius: 8px;

  }
}
</style>