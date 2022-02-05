<template>
  <div class="form-group">

  <textarea 
    class="input__field" 
    :style="{
      ...styles
    }"
    v-bind="$attrs" 
    :readonly="readonly"
    :value="modelValue" 
    @input="updateValue" 
    :placeholder="placeholder"
  />
  </div>
</template>

<script>
export default {
  name: 'QuestionTextArea',
  props: {
    label:{
      type: String,
    },
    modelValue: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    styles: {
      type: Object
    }
  },

  setup(props, context) {
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value)
    }

    return {
      updateValue
    }
  }
}
</script>
<style lang="scss" scoped>


.form-group{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  label {
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
    color: #000;
  }

  .input__field {
    background: #fdfdfd;
    border: 1.8px solid #00A9DC;
    box-sizing: border-box; 
    outline: none;
    font-size: 1.03rem;
    width: 100%;
    padding: 1rem 1.2rem;

    font-size: 16px;
    letter-spacing: .1px;
    line-height: 24px;
    font-weight: 400;
    color: black;
    
    
    caret-color: #1a73e8;
    display: block;
    min-height: 24px;
    outline: none;
    overflow-y: visible;
    overflow-x: hidden;
    resize: none;
    white-space: pre-wrap;
    word-wrap: break-word;
   

    
    



    &::placeholder {
      color: #002C51;
      // font-style: italic;
      font-size: 0.9rem;
    }
  }
}
</style>