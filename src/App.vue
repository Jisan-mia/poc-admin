<template>
  <div id="app">
    <NotificationContainer />
     <component :is="this.$route.meta.layout || 'div'">
       <transition name="route" mode="out-in">
        <router-view />
      </transition>
    </component>
  </div>
</template>


<script>
import { useStore } from 'vuex';
import NotificationContainer from "./components/ui/NotificationContainer.vue";


export default {
  components: { NotificationContainer },
  setup() {
    const store = useStore();
    store.commit('adminState/initializeStore')

    return {

    }
  }
}
</script>

<style lang="scss">

@import '@/styles/base.scss';

#nav {
  padding: 70px;
  
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

// route
.route-enter-from {
  opacity: 0;
  transform: translateX(300px)
}
.route-enter-active {
  transition: all 0.5s ease-out
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
.router-leave-active {
  transition: all 0.5s ease-in


}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}


.slide-enter-to {
  position: absolute;
  right: 0;
}


.slide-enter-from {
  position: absolute;
  right: -100%;
}


.slide-leave-to {
  position: absolute;
  left: -100%;
}


.slide-leave-from {
  position: absolute;
  left: 0;
}

</style>

