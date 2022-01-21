<template>
  <h3>Logging out...</h3>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
export default {
  name: 'Logout',
  setup() {
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => store.state.adminState.isAuthenticated)
    
    if(isAuthenticated.value && localStorage.getItem('token')) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
    
  }

}
</script>

<style>

</style>