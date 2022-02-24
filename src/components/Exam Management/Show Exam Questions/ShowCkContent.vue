<template>
  <div id="app">
    <div class="cont">
      <ckeditor :editor="editor" v-model="content"  :disabled="true"></ckeditor>
    </div>
  </div>
</template>

<script>
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { editorConfig } from '../../../api/common';

export default {
  name: "ShowCkContent",
  props: {
    content: {
      type: String
    }
  },
  setup(props) {
    const editor = InlineEditor;
    // This editor will be read–only when created.

    // console.log(props.content)

    return {
      editor,
      editorConfig,
    }
  }
};
</script>

<style lang="scss" scoped>
.cont {
  div {
    background: transparent;
    border: none!important;
    box-sizing: border-box; 
    padding-left: 0!important;
  }
  .ck.ck-editor__editable_inline>:last-child {
    margin-bottom: 0 !important;
  }
  .ck.ck-editor__editable_inline>:first-child {
    margin-top: 0 !important;
  }
  .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
    box-shadow: none !important;
  }
}


</style>