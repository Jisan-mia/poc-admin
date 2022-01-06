<template>
  <div class="app-container">
    <Sidebar />
    <main class="main">
      <slot />
    </main>
  </div>
  
</template>

<script>
import Sidebar from '../components/sidebar/Sidebar.vue'
export default {
  components: { Sidebar },
  name: 'AppLayout',
}
</script>

<style scoped lang="scss">
@import '@/styles/config.scss';
.app-container{
  background-color: #fafafa;
	min-height: 100vh;
	overflow-x: hidden;
  overflow-y: hidden;
	min-width: 100%;
}

.main{

		/* width: calc(100vw - 16rem); */
		margin-left: 16rem;
		transition: all 0.4s;
		padding: 0.2rem 1.8rem;
		margin-top: 45px;

    @include maxMedia(768px) {
      margin-left: 0rem;
    }
	
}
</style>>
