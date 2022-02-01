<template>
  <div class="container">
    <div class="batch">
      <BatchSettingsComp placeholder="Batch" :allOptions="batchOptions"/>
    </div>
    <div class="level">
      <BatchSettingsComp placeholder="Level" :allOptions="levelOptions"/>

    </div>
    <div class="board" >
      <BatchSettingsComp placeholder="Board" :allOptions="boardOptions"/>

    </div>
    
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from "vuex"
import BatchSettingsComp from "../../components/Exam Management/BatchSettingsComp.vue"
import { watchEffect } from '@vue/runtime-core';

export default {
  name: 'AdminBatchSettings',
  components: { BatchSettingsComp },
  setup() {
    const store = useStore();
    const batchOptions = computed(() => store.state.batchSettings.batchOptions);
    const levelOptions = computed(() => store.state.batchSettings.levelOptions);
    const boardOptions = computed(() => store.state.batchSettings.boardOptions);

    watchEffect(() => {
      console.log(batchOptions.value, levelOptions.value, boardOptions.value)
    })

    return {
      batchOptions,
      levelOptions,
      boardOptions
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';

.container {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  padding-bottom: 2.5rem;
  max-width: 600px;
  margin: 0 auto;
  @include maxMedia(600px) {
    max-width: 100%;

  }
}
</style>