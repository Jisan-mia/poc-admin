<template>
<div>
  <div class="container">
    <div class="wrapper">
      <CustomAdminBtn v-if="isAdmin"  type="info" icon="fas fa-plus" @onClick="this.$emit('handleAddExamPack')" >
       <span> Add Exam Pack </span>
      </CustomAdminBtn>
    </div>
  <div class="pack_container">
    <div v-for="examPack in examPacks" :key="examPack.id"  class="card" >
      <ExamPackCard :outline="isAdmin" @examPackClick="onExamPackClick" :examPack="examPack"/>
    </div>
    </div>
  </div>
</div>
</template>
<script>
import { ref } from '@vue/reactivity'
import getExamList from '../../api/examPackApi'
import ExamPackCard from '../../components/Exam Management/ExamPackCard.vue'
import { useRoute, useRouter } from 'vue-router'
import CustomAdminBtn from '../ui/CustomAdminBtn.vue'

export default {
  name: "AllExamPack",
  props: {

  },
  components: {
    ExamPackCard,
    CustomAdminBtn
},
  setup(props, ctx) {
      const examPacks = ref([
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
      
      const isAdmin = ref(false);
      const route = useRoute();
      const router = useRouter();
      isAdmin.value = route.path.includes('admin');

      const onExamPackClick = (examPack) => {
        // console.log('clicked', examPack)
        ctx.emit('examPackClick', examPack)
      }

      const {examList, error, loadExamList} = getExamList();
      const url = "http://www.exam.poc.ac/api/list_examPack"
      function apiFetch(){
          fetch(url)
          .then(res => res.json())
          .then(data => {
              console.log(data)
          })
      }
      // apiFetch();
      // onMounted(() => {

      // })

      return {
        examPacks,
        isAdmin,
        onExamPackClick
      }
  }
}

</script>


<style scoped>

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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-template-rows: max-content;
  grid-auto-rows: max-content;
  grid-gap:2rem 1.2em;
  flex: 1;
  justify-content: center;
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
  justify-content: center;
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

