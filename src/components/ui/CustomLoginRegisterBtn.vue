<template>
  <button :disabled="isSpin" v-bind="$attrs" :class="[outline ? 'outline' : '', 'base']" @click="$emit('onClick')">
    <!-- <i :style="{animation: 'spin 1s linear infinite'}" class="fas fa-spinner iconsS" v-if="isSpin" /> -->
      <div class="base-spinner" v-if="isSpin"></div>
      {{isSpin ? '' : buttonText}}
  </button>
</template>

<script>
export default {
  name: 'CustomLoginRegisterBtn.vue',
  emits: ['onClick'],
  inheritAttrs: false,
  props: {
    buttonText: {
      type: String,
      default: () => 'label'
    },
    outline: {
      type: Boolean,
      default: () => false
    },
    isSpin: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';

.iconS {
  animation: 'spin 1s linear infinite';
}
.base {
  background: linear-gradient(45.01deg, #146AB4 9.93%, #00D4FE 88.64%);
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.3rem;
  // line-height: 56px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #FFFFFF;
  padding: 1.35rem 0;
  outline: none;
  // border: 1.5px solid #146AB4;
  border: none;
  width: 100%;
  @include maxMedia(500px) {
    font-size: 1.1rem;
    padding: 1.25rem 0;
  }
  
  &:disabled{
    opacity: 0.75;
    cursor: not-allowed;
  }
  // &:active {
  //   transform: scale(0.99);
  // }
}
.outline {
  border: 1.5px solid #146AB4;
  // background: #fff;
  
  background: linear-gradient(45.01deg, #146AB4 9.93%, #00D4FE 88.64%);
	-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}



.base-button + .base-button {
  margin-left: 1em;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.base-spinner {
  position: relative;
  overflow: hidden;
  min-height: 21px;
  min-width: 21px;
}

.base-spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  background-color: inherit;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  top: 0;
  left: 0;
}

.base-spinner:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: inherit;
  animation: spinner 0.6s linear infinite;
  z-index: 2;
}

</style>