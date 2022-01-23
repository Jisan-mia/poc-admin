<template>
  <header class="header">
    <div class="header__input">
      <input  type="number" placeholder="Search With Phone Number" name="" id="">
      <input v-model="phoneSearch" type="text" name="" id="" placeholder="Search With Name">
      
      <select name="" id="" placeholder="Filter with Board" v-model="boardSelected">
        <option selected disabled value="">Filter by Board</option>
        <option value="all">All Board</option>
        <option value="dhaka">Dhaka</option>
        <option value="chittagong">Chittagong</option>
        <option value="sylhet">Sylhet</option>
        <option value="comilla">Comilla</option>
        <option value="mymensingh">Mymensingh</option>
        <option value="rajshahi">Rajshahi</option>
        <option value="rangpur">Rangpur</option>
        <option value="barisal">Barisal</option>
      </select>

    </div>
  </header>
  <div class="table__main">

  
  <table>
    <tbody>
      <tr>
        <td>
          <span>
            Phone Number
          </span>
        </td>
        <td>
          <span>
            Name
          </span>
        </td>
        <td>
          <span>
            Board
          </span>
        </td>
        <td>
          <span>
            Batch
          </span>
        </td>
      </tr>
      

      <tr class="main_row" v-for="student in allStudentList" :key="student.id">
        <td> 
          <router-link :to="{name: 'SpecificStudent', params: {studentId: student.id}}">
            <span class="phone">
              01301822644
            </span>
          </router-link>
        </td>
        <td>
          <div class="student__info">
            <div class="img__container">
              <img :src="student.Profile_image ? imageUrl(student.Profile_image) : '/images/placeholderImg2.svg'" alt="">
            </div>
            <div class="info">
              <h4> {{student.name}} </h4>
              <p> {{student.institution}} </p>
            </div>
          </div>
        </td>
        <td>
         <span>
           {{student.board}}
         </span>
        </td>

        <td>
          <span>
            {{student.level}} {{student.batch}}
          </span>
        </td>
      </tr>
    </tbody>
  </table>

  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
export default {
  name: 'AdminStudentManagement',
  setup() {
    const route = useRoute();
    const store = useStore();
    const boardSelected = ref('')
    const phoneSearch =ref('')
    const allStudentListD = computed(() => store.state.adminState.studentList);
    console.log(allStudentListD.value)

    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') ? img : `https://www.exam.poc.ac${img}`)


    const allStudentList = computed(() => {
      if(phoneSearch.value || boardSelected.value) {
        let allStudentMain = ref(allStudentListD.value)
        // console.log(allStudentMain.value)
        if(phoneSearch.value) {
           allStudentMain.value = allStudentMain.value.filter(student => {
            return phoneSearch.value.toLowerCase().split(' ').every(v => student.name.toLowerCase().includes(v)) 
          })
        } 
        if(boardSelected.value) {
            allStudentMain.value = allStudentMain.value.filter(student => {
              if(boardSelected.value == 'all') return student
              return student.board.toLowerCase().includes(boardSelected.value.toLowerCase())
            })
        }
        return allStudentMain.value

      } else {
        return allStudentListD.value
      }
    })






    

    return {
      allStudentList,
      imageUrl,
      boardSelected,
      phoneSearch
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';

.table__main{
  width: 100%;
  margin-bottom: 2rem;
  @include maxMedia(768px) {
    overflow-x: scroll;
  }
}

table {
  border-collapse: collapse;
  width: 100%;
  tbody tr{
    border-bottom: 1px solid #CDCDCD;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr;
    // grid-template-columns: repeat(6, 1fr);
    @include maxMedia(768px) {
      // grid-template-columns: repeat(6, 200px);
      grid-template-columns: 200px 350px 180px 100px;
    }


    &:first-child{
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.2rem;
      letter-spacing: 0.2px;
      color: #9FA2B4;
    }

    .date__time{
      @include flexVertical;
      justify-content: center;
      align-items: flex-start;  
      
      color: #454545;
      font-size: 0.7rem;
      .date{
        margin-bottom: 0.3rem;
        color: #000;
        font-size: 0.88rem;
      }
    }
  }
  tr td{
    // border: 1px solid blue;
    text-align: left;
    padding:1rem 2rem 1rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @include maxMedia(968px) {
      padding: 0.5rem 0.9rem 0.5rem 0;
    }
  }
  .main_row td {
    span{
      font-weight: 600;
      font-size: 1.05rem;
      line-height: 1.2rem;
      letter-spacing: 0.2px;
      color: #000;
    }
    span.phone {
      font-display: 600;
      letter-spacing: 0.2px;
      text-decoration-line: underline;
      color: #00335C;
      cursor: pointer;
    }
    .student__info{
    @include flexCenter;
    gap: 0.9rem;
    .img__container{
      height: 42px;
      min-width: 42px;
      width: 42px;
      border-radius: 50%;
      background-color: #cdcdcd;
      img{
        width:100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        background-position: center center;
      }
    }
    
    .info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.3rem;
      h4{
        font-weight: 600;
        font-size: 0.9REM;
        line-height: 20px;
        letter-spacing: 0.2px;
        color: #000;
      }
      P{
        font-size: 0.8rem;
        line-height: 20px;
        letter-spacing: 0.2px;
        color: #454545;
      }
    }

   }
  }
  tr td:nth-child(2) {
    // grid-column: span 2
    min-width: 300px;
  }
  tr td:last-child {
    text-align: center;
    justify-content: center;
  }

}
.header__input{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 250px);
  justify-content: flex-start;
  align-content: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
  @include maxMedia(768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
  }


  input, select {
    border: 1px solid #00a9dc;
    box-sizing: border-box;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 0.9rem;
    outline: none;
    padding: 0.7rem 1rem;
    text-align: center;
    width: 100%;
    &::placeholder{
      color: #696969;
    }
  
  }
  select{
    text-align: left;
  }
  // input[type='text'] {
  //   min-width: 15%;
  //   width: 25%;
  // }
  
  
}



</style>