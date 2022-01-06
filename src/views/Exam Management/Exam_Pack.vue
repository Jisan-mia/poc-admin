<template>
  <AllExamPack @examPackClick="handleExamPackClick" />
</template>

<script>
import { useRouter } from 'vue-router'
import AllExamPack from '../../components/Exam Management/AllExamPack.vue'
export default {
  components: {
    AllExamPack
  },
  name: 'Exam_Pack',
  setup() {
    const router = useRouter()
    const handleExamPackClick = (examPack) => {
      alert(JSON.stringify(examPack))
      router.push('/exam-pack/pack-title')
    }


    return {
      handleExamPackClick
    }
  }
}
</script>

<style>

</style>