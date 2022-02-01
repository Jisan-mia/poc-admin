<template>
  <div class="toggle__container" @click="onToggleSwitch"  >
    <div :class="['wrapper', modelValue ? 'off' : 'on', disabled ? 'disable': '' ]">
      <div class="circle">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlockingSwitch",
  props: {
    modelValue: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, ctx) {
    const onToggleSwitch = () => {
      if(props.disabled) {
        return;
      }
      ctx.emit('update:modelValue', !props.modelValue)
    }
    return {
      onToggleSwitch
    }
  },
  
 
}
</script>

<style lang="scss" scoped>
.toggle__container {
  display: flex;

  .wrapper {
    position: relative;
    width: 38px;
    height: 21px;
    // min-height: 15px;
    display: flex;
    cursor: pointer;
    border-radius: 15px;
    align-items: center;
    padding: 2px;
    transition: all 0.5s;
    background: #FE3C3C;

    
    .circle {
      width: 19px;
      height: 19px;
      border-radius: 15px;
      position: relative;
      background: #FFFFFF;
      box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.12);
    }
  }
  .wrapper.on {
    // background: green;
    justify-content: flex-end;
    background: #65C466;
  }

  .wrapper.on .circle {
    animation: slideIn 0.2s ease;
  }

  @keyframes slideIn {
    from {
      right: 19px;
      }
    to {
      right: 0px;
    } 
  }
  .wrapper.off .circle{
    // background: grey;
    // justify-content: flex-start;
    
    animation: slideOut 0.3s ease;
  }

  @keyframes slideOut {
    from {
      left: 19px
      }
    to {
      left: 0px;
    } 
  }

  
  .wrapper.disable{
    cursor: not-allowed;
    opacity: 0.7;
  }
}
</style>
 

<!-- below is example of v-model use -->
<!--
<template>
  <div class="checkbox__slider">
    <input type="checkbox" :disabled="disabled"  :checked="modelValue" id="checkbox" @change="onChange">
    <label for="checkbox" :class="disabled ? 'disable': '' "  class="slider"></label>
  </div>
</template>

<script>
export default {
  name: 'toggleSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, ctx) {
    console.log(props.modelValue)
    const onChange = (event) => {
      console.log(props.modelValue)
      ctx.emit('update:modelValue',  event.target.checked)
    }

    return {
      onChange
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox__slider {
  display: flex;
  align-items: center;
  
  input {
    display: none;
  }
  input:checked + .slider {
    // background: #00A9DC;

  }
  input:checked + .slider::before {
    transform: translateX(19px);
    background: #00A9DC;
  }
  .slider.disable {
    cursor: not-allowed;
  }
  .slider {
    position: relative;
    margin-right: 10px;
    width: 34px;
    height: 16px;
    background: #C4C4C4;

    transition: .4s;
    border-radius: 25px;
    cursor: pointer;

    &::before {
      position: absolute;
      content: "";
      height: 21px;
      width: 22px; 
      left: -2px;
      top: -2px;
      background: #979797;
      transition:0.4s;
      border-radius: 50%;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.15); 
    }
  }
}
</style>

-->