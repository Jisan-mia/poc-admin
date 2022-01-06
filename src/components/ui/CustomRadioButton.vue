<template>
  <label :class="['form-control', active ? 'active': '']">
    <input 
      type="radio" 
      :checked="modelValue === option"
      :value="option" 
      :id="option"
      @change="$emit('update:modelValue', option)"
      :name="name"
    >
    <span v-if="!isEditOption">{{option}}</span>
  </label>
 
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import AdminCustomInput from '../Exam Management/AdminCustomInput.vue';
import AdminCustomInput1 from '../Exam Management/AdminCustomInput.vue';
export default {
  name: "CustomRadioButton",
  props: {
    modelValue: {
        type: String
    },
    option: {
        type: String
    },
    isEditOption: {
        type: Boolean,
        default: () => false
    },
    name: {
        type: [String, Number]
    }
  },
  setup(props, ctx) {
    const active = ref(false);
    const checked = computed(() => {
        return props.modelValue === props.option;
    });
    const onChange = (event) => {
        ctx.emit("update:modelValue", event.target.value);
    };
    return {
        onChange,
        active,
        checked
    };
  },
  components: { AdminCustomInput, AdminCustomInput1 }
}
</script>

<style scoped lang="scss">



.form-control {
  font-size: 1.12rem;
  font-weight: 400;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.7em;
  cursor:pointer;
  transition: all 0.3s linear;
  color: hsla(0, 0%, 0%, 0.9);
  &:hover{
    color: #00A9DC
  }
  // &:focus-within{
  //   color: #00A9DC
  // }

  input[type="radio"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: #ccc;
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    color: #ccc;
    width: 22px;
    height: 22px;
    border: 1px solid #ccc;
    border-radius: 50%;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
  }

  input[type="radio"]::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    /* Windows High Contrast Mode */
    background-color:  #00B066;
  }

  input[type="radio"]:checked::before {
    transform: scale(1);
  }

}

.form-control.active{
  color: #00A9DC;
}


</style>