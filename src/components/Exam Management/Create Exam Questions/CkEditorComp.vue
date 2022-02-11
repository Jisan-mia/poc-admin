<template>
  <div id="app">
    <div class="cont">

      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" :disabled="false"></ckeditor>
    </div>
  </div>
</template>
<script>
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

import { ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';
import { editorConfig } from '../../../api/common';
export default {
  name: "CkEditorComp",
  setup(props) {
    const editor = InlineEditor;
    const editorData = ref('')
    // This editor will be read–only when created.

    watchEffect(() => {
      console.log(editorData.value)
    })



    return {
      editor,
      editorData,
      editorConfig,
    }
  }
};
</script>

<style lang="scss" scoped>
.cont {
  div {
    border: 1px solid #6354f0 !important;
    
  }
  .ck.ck-editor__editable_inline>:last-child {
    margin-bottom: 0.5rem !important;
  }
  .ck.ck-editor__editable_inline>:first-child {
    margin-top: 0.5rem !important;
  }
}
</style>