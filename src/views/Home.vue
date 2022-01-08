<template>
  <div class="home">
    loading..
    <!-- <router-link :to='{name: "Login"}'>
      <h2>
        Go to Login
      </h2>
    </router-link> -->
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "Home",
  setup() {
    const router = useRouter();

    router.push('/login')

    return {

    }
  }
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