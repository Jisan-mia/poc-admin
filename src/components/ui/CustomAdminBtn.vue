<template>
  <button :disabled="disabled" :class="[type, rounded && 'round']" @click="$emit('onClick')">
    <i v-if="icon" class="icon" :class="icon" />
    <span class="text">
      <slot />
    </span>
  </button>

</template>

<script>
export default {
  name: 'CustomAdminBtn',
  emits: ['onClick'],
  props: {
    icon: {
      type: String
    },
    type: {
      type: String,
      default: () => 'primary'
    },
    disabled: {
      type: Boolean, 
      default: () => false
    },
    rounded: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
button {
  background: transparent;
  font-size: 1.05rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  color: #FFFFFF;
  padding: 1rem;
  outline: none;
  border: none;
  width: 100%;

  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s linear;

  text-align: center;


  @include maxMedia(500px) {
    font-size: 0.96rem;
    padding: 0.85rem;
  }
  
  &:active {
    transform: scale(0.99);
  }
  .icon {
    // color: #fff;
    color: inherit;
    width: 22px;
  }
  &[disabled]{
    cursor: not-allowed;
  }
  &.primary {
     background: #06A964;
     color: #fff;
  }
  &.danger {
    background-color: #FF4D4D;
    color: #fff;
  }
  &.info {
    background-color: #00A9DC;
    color: #fff;
  }
 
  &.round {
    border-radius: 5px;
  }

  &:hover {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
    box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  &:active {
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: none;
  }

  &:focus {
    outline: 0;
  }

  &:disabled {
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: none;
  }


}

 
</style>