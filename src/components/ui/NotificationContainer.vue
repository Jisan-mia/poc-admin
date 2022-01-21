<template>
<div class="container">
    <NotificationBar
    v-for="notification in notifications"
    :key="notification.id"
    :notification="notification"
  />
</div>
  
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import NotificationBar from "./NotificationBar.vue"
export default {
  name: "NotificationContainer",
  setup() {
    const store = useStore();
    const notifications = computed(() => store.state.notifications.notifications);


    return {
      notifications

    };
  },
  components: { NotificationBar }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2em;
  overflow: hidden;
  z-index: 1052;
  pointer-events: none;
  flex-direction: column;

  
}


</style>