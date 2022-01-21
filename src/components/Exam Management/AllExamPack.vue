<template>
<div>
  <div class="container">
    <div class="wrapper">
      <CustomAdminBtn type="info" icon="fas fa-plus" @onClick="this.$emit('handleAddExamPack')" >
       <span> Add Exam Pack </span>
      </CustomAdminBtn>
    </div>
  <div class="pack_container">
    <div v-for="examPack in examPacks" :key="examPack.id"  class="card" >
      <ExamPackCard :outline="true" @examPackClick="onExamPackClick" :examPack="examPack"/>
    </div>
    </div>
  </div>
</div>
</template>
<script>
import { computed, ref } from '@vue/reactivity'
import ExamPackCard from '../../components/Exam Management/ExamPackCard.vue'
import CustomAdminBtn from '../ui/CustomAdminBtn.vue'
import { useStore } from 'vuex'

export default {
  name: "AllExamPack",
  props: {

  },
  components: {
    ExamPackCard,
    CustomAdminBtn
},
  setup(props, ctx) {
      const examPacksd = ref([
        {
          id: 1, 
          title: 'Elite Exam Mania',
          detail: "lorem lorem ipsum lorem ipsum concetre lorem ipsum conscentre. these are dummy text. but these text seems meaningfull in first seen, later on we understand these words/sentence has no meaning. It's really funny, is'nt it? Yeah, I think so.",
          label: 'HSC',
          batch: '2021',
          image: ''
        },{
          id: 2, 
          title: 'Elite Exam Mania',
          detail: "lorem lorem ipsum lorem ipsum concetre lorem ipsum conscentre. these are dummy text. but these text seems meaningfull in first seen, later on we understand these words/sentence has no meaning. It's really funny, is'nt it? Yeah, I think so.",
          label: 'HSC',
          batch: '2021',
          image: ''
        },{
          id: 3, 
          title: 'Elite Exam Mania',
          detail: "lorem lorem ipsum lorem ipsum concetre lorem ipsum conscentre. these are dummy text. but these text seems meaningfull in first seen, later on we understand these words/sentence has no meaning. It's really funny, is'nt it? Yeah, I think so.",
          label: 'HSC',
          batch: '2021',
          image: ''
        },{
          id: 4, 
          title: 'Elite Exam Mania',
          detail: "lorem lorem ipsum lorem ipsum concetre lorem ipsum conscentre. these are dummy text. but these text seems meaningfull in first seen, later on we understand these words/sentence has no meaning. It's really funny, is'nt it? Yeah, I think so.",
          label: 'HSC',
          batch: '2021',
          image: ''
        },{
          id: 5, 
          title: 'Elite Exam Mania',
          detail: "lorem lorem ipsum lorem ipsum concetre lorem ipsum conscentre. these are dummy text. but these text seems meaningfull in first seen, later on we understand these words/sentence has no meaning. It's really funny, is'nt it? Yeah, I think so.",
          label: 'HSC',
          batch: '2021',
          image: ''
        },{
          id: 6, 
          title: 'Elite Exam Mania',
          detail: "lorem lorem ipsum lorem ipsum concetre lorem ipsum conscentre. these are dummy text. but these text seems meaningfull in first seen, later on we understand these words/sentence has no meaning. It's really funny, is'nt it? Yeah, I think so.",
          label: 'HSC',
          batch: '2021',
          image: ''
        },{
          id: 7, 
          title: 'Elite Exam Mania',
          detail: "lorem lorem ipsum lorem ipsum concetre lorem ipsum conscentre. these are dummy text. but these text seems meaningfull in first seen, later on we understand these words/sentence has no meaning. It's really funny, is'nt it? Yeah, I think so.",
          label: 'HSC',
          batch: '2021',
          image: ''
        },{
          id: 8, 
          title: 'Elite Exam Mania',
          detail: "lorem lorem ipsum lorem ipsum concetre lorem ipsum conscentre. these are dummy text. but these text seems meaningfull in first seen, later on we understand these words/sentence has no meaning. It's really funny, is'nt it? Yeah, I think so.",
          label: 'HSC',
          batch: '2021',
          image: ''
        }
      ])
      const store = useStore();
      const examPacks = computed(() => store.state.examPackState.examPacks);

      const onExamPackClick = (examPack) => {
        // console.log('clicked', examPack)
        ctx.emit('examPackCardClick', examPack)
      }
      // examPacks.value.length = 2

      return {
        examPacks,
        onExamPackClick
      }
  }
}

</script>


<style scoped lang="scss">
@import '@/styles/config.scss';

.container{
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
}
.wrapper {
  max-width: 380px;
}

.pack_container{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 300px));
  grid-template-rows: max-content;
  grid-auto-rows: max-content;
  grid-gap:2rem 1.2em;
  flex: 1;
  justify-content: flex-start;
  @include maxMedia(980px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    justify-content: center
  }
}
.pack_container::after{
  content: "";
  display: block;
  grid-column-start: 1;
  height: 1em;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.8em;
}
@media (max-width: 600px) {

}
.primary-btn{
  border: none;
  outline: none;
  padding: 1rem 1.2rem;;
  border-radius: 1rem;
  background: #00A9DC;
  color: #fff;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.3rem;
  text-align: center;
  cursor: pointer;
}
.flex-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}

</style>

