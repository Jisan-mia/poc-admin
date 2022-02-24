
<template>
<div class="upper_cont">
  <div class="main__container">
      <span v-if="isLoading && answerSheet.length">
        <Spinner />
      </span>
      <span v-else>
        <AnswerSheetTopbar />
        <ExamPageExamDetail /> 
        <ShowAllExamQuestions v-if="answerSheet.length" :isViewAnswerSheet="true" :viewAnswerSheet="answerSheet" />
      </span>
    </div>
</div>
  
</template>
  
<script>
import { computed, onBeforeMount, onMounted, ref, watchEffect } from '@vue/runtime-core';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import ExamPageTopBar from '../../components/Exam Management/ExamPageTopBar.vue';
import ExamPageExamDetail from '../../components/Exam Management/ExamPageExamDetail.vue';
import ShowAllExamQuestions from '../../components/Exam Management/ShowAllExamQuestions.vue';
import { useStore } from 'vuex';
import CustomAdminBtn from '../../components/ui/CustomAdminBtn.vue';
import Spinner from '../../components/ui/Spinner.vue';
import { setVisibleSidebar } from '../../layouts/sidebarState';
import AnswerSheetTopbar from '../../components/Exam Management/AnswerSheetTopbar.vue';




export default {
  components: { ExamPageTopBar, ExamPageExamDetail, ShowAllExamQuestions, CustomAdminBtn, Spinner, AnswerSheetTopbar },
  name: 'ViewDownloadComp',
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore(); 
    const examLists = computed(() => store.state.examPackState.examLists)
    // console.log(examLists.value)
    const answerSheet = computed(() => store.state.examResult.answerSheet)

    const {id} = route.params;

    const isAuthenticated = computed(() => store.state.userState.user.isAuthenticated)
    const isLoading = ref(false);



    const fetchAnswerSheet = async () => {
      isLoading.value = true;
      try {
        await store.dispatch('examPackState/getViewDownloadAnswer', id)
        isLoading.value = false;

        // console.log(answerSheet.value)

      } catch(err) {
        console.log(err)
        router.push('/dashboard')
      }
    }



    onMounted(() => {
      setVisibleSidebar(false)
      
      // console.log(visibleSidebar.value)
      
      fetchAnswerSheet()
    })

    onBeforeRouteLeave(() => {
      setVisibleSidebar(true)
    })


    
    

    
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    })

    return {
      isLoading,
      answerSheet
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.upper_cont {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000a3;
  height: fit-content;
  margin-top: 0;
  padding-top: 4rem;

}

.main__container {
  padding: 1rem 2rem 2rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  background: #F4F4F4;

  @include maxMedia(768px) {
    max-width: 100%;
    margin: auto 20px ;
  }
}
</style>