<template>
  <h3>Logging out...</h3>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Logout',
  setup() {
    const router = useRouter();

    router.push('/login')
  }

}
</script>

<style>

</style>