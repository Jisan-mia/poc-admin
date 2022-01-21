<template>
  <input type="file" accept="image/*" @change="onChangeFile" name="file" />
</template>

<script>
export default {
  props: ["modelValue"],
  setup(props, ctx) {
    function onChangeFile(event) {
      const input = event.target;
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          // ctx.emit('update:modelValue', e.target.result)
          // console.log(e.target.result)
          ctx.emit('imagInput', e.target.result)
        }
        
        reader.readAsDataURL(file[0])
        // this.$emit('input', file[0])
      }
      ctx.emit("update:modelValue", event.target.files[0]);
      
    }
    return {
      onChangeFile,
    };
  },
};
</script>