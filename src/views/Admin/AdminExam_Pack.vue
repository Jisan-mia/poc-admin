<template>
  <span v-if="currentCompState == 'adminExamPack'">
    <AllExamPack @handleAddExamPack="handleCreateExamPack" @examPackClick="onExamPackCardClick"/>
  </span>

  <span v-else-if="currentCompState == 'isAdminExamPackCreate'">
    <AdminExamPackComp :isAdminExamPackCreate="true" @backExamPack="handleBack" />
  </span>

  <span v-else-if="currentCompState  == 'isAdminExamPackEdit'">
    <AdminExamPackComp  :editExamPack="editExamPack" @backExamPack="handleBack" />
  </span>
</template>

<script>
import AllExamPack from '../../components/Exam Management/AllExamPack.vue'
import AdminExamPackComp from '../../components/Exam Management/AdminExamPackComp.vue';
import { ref } from '@vue/reactivity';
export default {
  components: {
    AllExamPack,
    AdminExamPackComp
},
  name: 'AdminExam_Pack',
  setup() {
    const currentCompState = ref('adminExamPack') // adminExamPack | isAdminExamPackEdit | isAdminExamPackCreate
    const handleCreateExamPack = () => {
      // alert('exam pack admin create')
      currentCompState.value = 'isAdminExamPackCreate';
    }

    const editExamPack = ref(null)

    const onExamPackCardClick = (examPack) => {
      // console.log('clicked', examPack)
      editExamPack.value = {...examPack}
      // alert(JSON.stringify(examPack))
      currentCompState.value = 'isAdminExamPackEdit'
    }

    const handleBack = () => {
      currentCompState.value = 'adminExamPack'

    }


    return {
      onExamPackCardClick,
      handleCreateExamPack,
      currentCompState,
      editExamPack,
      handleBack

    }
  }
}
</script>

<style>

</style>