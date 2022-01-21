<template>

    <div class="notification__bar" :class="notificationTypeClass">
    <div class="icon">
    </div>
    <p>{{notification.message}}</p>
  </div>
  
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
name: 'NotificationBar',
props: {
  notification: {
    type: Object,
    required: true,
  }
},
setup(props, ctx){
  const store = useStore();
  const fadeOutClass = ref('')

  const notificationTypeClass = computed(() => `${props.notification.type} fade-in-down`);
  // console.log(notificationTypeClass.value)

  const timeout = ref(null);
  onMounted(() => {
    timeout.value = setTimeout(() => store.dispatch('notifications/remove', props.notification), 3000)
  })

  onBeforeUnmount(() => {
    clearTimeout(timeout.value)
  })

  return {
    notificationTypeClass

  }
}
}
</script>



<style lang="scss" scoped>

/*
default: #343a40;
success: #47d78a
error: #f7471c
warning: #febc22
info: #1c85d5

*/
.notification__bar-enter {
  transform: translateY(-100%);
}
.notification__bar-enter-active {
  transition: transform 3s ease;
}
.notification__bar-enter-to{
  transform: translateY(0%);
}

.notification__bar {
  margin: 1em 0 1em;
  align-self: flex-end;
  opacity: 1;
  min-height: 4em;

  background-color: #343a40; // default
  display: inline-flex;
  align-items: center;
  animation-duration: 150ms;
  margin: 0.5em 0;
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  border-radius: 0.25em;
  pointer-events: auto;
  // opacity: .92;
  color: #fff;
  cursor: pointer;

  .icon {
    display: block;
    width: 27px;
    min-width: 27px;
    height: 27px;
    margin-left: 1em;

    background: url('/icons/info.svg') no-repeat;
  }

    
  p {
    margin: 0;
    padding: 0.5em 1em;
    word-break: break-word;
  }
}
.notification__bar.success{ 
  background-color: #47d78a;
  .icon {
    background: url('/icons/success.svg') no-repeat;
  }
}

.notification__bar.info{ 
  background-color: #1c85d5;
  .icon {
    background: url('/icons/info.svg') no-repeat;
  }
}

.notification__bar.error{ 
  background-color: #f7471c;
  .icon {
      background: url('/icons/error.svg') no-repeat;
  }
}

.notification__bar.warning{ 
  background-color: #febc22;
  .icon {
  background: url('/icons/warning.svg') no-repeat;
  }
}


@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.notification__bar.fade-out {
  animation-name: fadeOut;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.notification__bar.fade-in-down {
  animation-name: fadeInDown;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.notification__bar.fade-in-up {
  animation-name: fadeInUp;
}


</style>