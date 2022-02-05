<template>
  <header class="header">
    <div class="exam__info">
      <h3 class="exam__header">Exam Info</h3>

      <div class="header__container">

        <div class="item1">
          <div class="exam__img">
            <img :src="imageUrl(currentExam.cover_photo)" alt="">
          </div>
        </div>

        <div class="item2">
          <h3> {{currentExam.Exam_name}}</h3>
          <p>
            {{currentExam.details}}
          </p>
          <p>{{endTime}} | {{dayName}}, {{endDate}}</p>
        </div>

        <div class="item3">
          <div>
            <h3>Assigned Student</h3>
            <div class="more__info">
              <div class="group">
                <p class="label">Batch</p>
                <p class="value">
                  {{currentExam.level}}{{currentExam.batch}}
                </p>
              </div>
              <div class="group">
                <p class="label">Exam Pack</p>
                <p class="value">
                  {{currentExamPack.ExamPack_name}}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3>Marking</h3>
            <div class="more__info mark__info">
              <div class="group">
                <p class="label">Total Mark</p>
                <p class="value">
                   {{currentExam.total_mark}}
                  
                </p>
              </div>
              <div class="group">
                <p class="label">Per Question Mark</p>
                <p class="value">
              {{currentExam.mark_per_question}}

                </p>
              </div>
              <div class="group">
                <p class="label">Pass Mark</p>
                <p class="value">
              {{currentExam.pass_mark}}

                </p>
              </div>
            </div>
          </div>
          
        </div>

       <div class="item4">
          <div class="switches">
            <h3>Randomization : </h3>
            <div class="switch">
              <ToggleSwitch v-model="currentExam.isRandomization" :disabled="true"/>
            </div>
          </div>

          <div class="switches ngMark1">
            <h3>Negative Marketing : </h3>
            <div class="switch ngMark">
              <ToggleSwitch v-model="currentExam.isNegativeMarking" :disabled="true" />
            </div>
          </div>
          <div class="negativeMark" v-if="currentExam.isNegativeMarking">
              <p>Amount per mistake</p>
              <AdminCustomInput 
                :style="{maxHeight: '35px', maxWidth: '60px', textAlign: 'center', padding: '8px 0px'}" 
                v-model="currentExam.amount_per_mistake" type="number"
                :disabled="true"
              />
          </div>
        </div>

      </div>

    </div>

    <div class="header__input">
      <input v-model="phoneSearch" type="text" placeholder="Search with Phone Number" name="" id=""> <!--phone number was-->
      <button :class="{selected: isActive}"  @click="handleSelectFilter('highToLow')">
        Filter High To Low
      </button>
      <button :class="{selected: isActive2}" @click="handleSelectFilter('lowToHigh')">
        Filter Low To High
      </button>
     
     <button :class="{selected: isActive3}" @click="handleSelectFilter('timestamp')"> 
        Timestamp
      </button>

      <select name="" id="" placeholder="Filter with Board" v-model="boardSelected">
        <option selected disabled value="">Filter by Board</option>
        <option value="all">All Board</option>
        <!-- <option value="dhaka">Dhaka</option>
        <option value="chittagong">Chittagong</option>
        <option value="sylhet">Sylhet</option>
        <option value="comilla">Comilla</option>
        <option value="mymensingh">Mymensingh</option>
        <option value="rajshahi">Rajshahi</option>
        <option value="rangpur">Rangpur</option>
        <option value="barisal">Barisal</option> -->
        <option v-for="board in boardOptions" :key="board.id" :value="board.board">
          {{board.board}}
        </option>

      </select>
    </div>
  </header>
  <div class="table_main">
 
  <table>
    <tbody>
      <tr>
        <td>
          <span>
            Rank
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
            Timestamp
          </span>
        </td>
        <td>
          <span>
            Score
          </span>
        </td>
        <td>
          <span>
            Negative Marking
          </span>
        </td>
      </tr>
      

      <tr class="main_row" v-for="report in specificReports" :key="report.id">
        <!-- {{JSON.stringify(report)}} -->
        <td> 
          <span>
            {{report.mainRank}}
          </span>
        </td>
        <td>
          <div class="student__info">
            <div class="img__container">
              <img :src="report.Profile_image ? imageUrl(report.Profile_image) : '/images/placeholderImg2.svg'" alt="">
            </div>
            <div class="info">
              <h4> {{report.name}} </h4>
              <p> {{report.institution}} </p>
            </div>
          </div>
        </td>
        <td>
         <span>
           {{report.board}}
         </span>
        </td>

        <td>
          <span>
            {{timeStampF(report.timestamp)}}
          </span>
        </td>
        <td>
          <span>
            {{`${report.score}/${currentExam.total_mark}`}}
          </span>
        </td>
        <td>
          <span>
            {{Math.round(report.negative_marking*100)/100}}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref, watchEffect } from '@vue/runtime-core';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import CustomAdminBtn from '../ui/CustomAdminBtn.vue';
import AdminCustomInput from './AdminCustomInput.vue';
import ToggleSwitch from '../ui/ToggleSwitch.vue';
export default {
  name: "SpecificExamReportComp",
  setup() {
    const route = useRoute();
    const store = useStore();
    const selectedFilter = ref(''); // 'highToLow', 'lowToHigh', 'timestamp'
    const boardSelected = ref('');
    const phoneSearch =ref('');

    const examPacks = computed(() => store.state.examPackState.examPacks);
    const examLists = computed(() => store.state.reportingState.reportings);
    const boardOptions = computed(() => store.state.batchSettings.boardOptions);


    const { examId } = route.params;
    console.log({ examId });
    // search current exam by route examId
    const currentExam = computed(() => examLists.value.find(exam => exam.exam_id == `#${examId}`));
    watchEffect(async () => {
      try {
        await store.dispatch("reportingState/loadSpecificReports", currentExam.value.Exam_name);
      }
      catch (error) {
        console.log(error);
      }
    });

    

    const specificReportsStateM = computed(() => store.state.reportingState.specificReportings);
    

    
    const specificReportsState = computed(() => {
      const main = ref([...specificReportsStateM.value])
      main.value.sort((a,b) => b.score - a.score);
      return main.value.map((item, index) => {
        return {
          ...item,
          mainRank: index+1
        }
      } )
    })
    
    

    

    // const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') ? img : `https://www.exam.poc.ac${img}`)
    const imageUrl = computed(() => (img) => img.includes('https://www.exam.poc.ac') || img.includes('http://www.exam.poc.ac')  ? img : `https://www.exam.poc.ac${img}`)
    



    const specificReports = computed(() => {
      if(phoneSearch.value || boardSelected.value || selectedFilter.value) {
        let specificReportsMain = ref(specificReportsState.value);
        // console.log(specificReportsMain.value)
        if(phoneSearch.value) {
           specificReportsMain.value = specificReportsMain.value.filter(report => {
            return phoneSearch.value.toLowerCase().split(' ').every(v => report.phone_number.toLowerCase().includes(v)) 
          })
        } 
        if(selectedFilter.value) {
          if(selectedFilter.value === 'highToLow') {
            specificReportsMain.value.sort((a, b) => b.score - a.score);
            
          } else if(selectedFilter.value === 'lowToHigh') {
            specificReportsMain.value.sort((a, b) => a.score - b.score)
          } else if(selectedFilter.value === 'timestamp') {
            specificReportsMain.value.sort((a, b) => {
	            const now = dayjs().format('YYYY-MM-DD hh:mm:ss');

              const day1 = dayjs(currentExam.value.Exam_end_date+a.timestamp).format('YYYY-MM-DD hh:mm:ss')
              const day2 = dayjs(currentExam.value.Exam_end_date+b.timestamp).format('YYYY-MM-DD hh:mm:ss')
              const t1 = dayjs(day1).diff(now, 'second');
              const t2 = dayjs(day2).diff(now, 'second');
              return t1 - t2
              // return b.timestamp - a.timestamp
            });
          }
        }
        if(boardSelected.value) {
            specificReportsMain.value = specificReportsMain.value.filter(report => {
              if(boardSelected.value == 'all') return report
              return report.board.toLowerCase().includes(boardSelected.value.toLowerCase())
            })
        }
        return specificReportsMain.value

      } else {
        return specificReportsState.value.sort((a,b) => a.mainRank - b.mainRank)
      }
    })



    const isActive = ref(false)
    const isActive2 = ref(false)
    const isActive3 = ref(false)

    // selected filter from 3 button
    const handleSelectFilter = (type) => {
      selectedFilter.value = type;
      if(type == 'highToLow') {
        isActive.value = !isActive.value;
        isActive2.value = false
        isActive3.value = false
        if(!isActive.value) {
          selectedFilter.value = ''
        }
      } else if(type === 'lowToHigh') {
        isActive.value = false
        isActive2.value = !isActive2.value
        if(!isActive2.value) {
          selectedFilter.value = ''
        }
        isActive3.value = false
      } else if(type === 'timestamp')  {
        isActive.value = false
        isActive2.value = false
        isActive3.value = !isActive3.value
        if(!isActive3.value) {
          selectedFilter.value = ''
        }
      }
    }

    // exam pack for current exam

    const currentExamPack = computed(() => examPacks.value.find(pack => pack.id == currentExam.value.exam_pack));
    //console.log(currentExam.value)
    //console.log(currentExamPack.value);
    const timeF = computed(() => (date, time) => {
      const examDate = dayjs(date + time).format("YYYY-MM-DD hh:mm:ss A");
      return dayjs(examDate).format("hh:mm:ss A");
    });

    const timeStampF = computed(() => (time)=>  {
      const fullDate =  dayjs(currentExam.value.Exam_end_date+time).format('YYYY-MM-DD hh:mm:ss A');
      // console.log(fullDate)
      return dayjs(fullDate).format("hh:mm:ss A")
    })
    // console.log(timeStampF.value)

    const endDate = computed(() => dayjs(currentExam.value.Exam_end_date).format("DD/MM/YYYY"));
    // const endTime = currentExam.value.Exam_end_time;
    const endTime = computed(() => {
      const examDate = dayjs(currentExam.value.Exam_end_date + currentExam.value.Exam_end_time).format("YYYY-MM-DD hh:mm:ss A");
      return dayjs(examDate).format("hh:mm:ss A");
    });

    const days = ref(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
    const dayNum = computed(() => dayjs(endDate.value).day());
   
    const dayName = days.value[dayNum.value];

    
    
    return {
      currentExam,
      currentExamPack,
      endDate,
      endTime,
      dayName,
      specificReports,
      selectedFilter,
      handleSelectFilter,
      boardSelected,
      phoneSearch,
      isActive,
      isActive2,
      isActive3,
      imageUrl,
      timeStampF,
      boardOptions
    };
  },
  components: { CustomAdminBtn, AdminCustomInput, ToggleSwitch }
}
</script>

<style lang="scss" scoped>
@import '@/styles/config.scss';
.table_main{
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
    grid-template-columns: 1fr 2fr 1.5fr 1.5fr 1fr 1.5fr;
    // grid-template-columns: repeat(6, 1fr);
    @include maxMedia(768px) {
      // grid-template-columns: repeat(6, 200px);
      grid-template-columns: 100px 260px 170px 150px 100px 100px;
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
        text-transform: capitalize;
      }
      P{
        font-size: 0.8rem;
        line-height: 20px;
        letter-spacing: 0.2px;
        color: #454545;
        text-transform: capitalize;
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-content: flex-start;
  align-content: center;
  gap: 0.85rem;
  margin-bottom: 0.3rem;

  @include maxMedia(768px) {
      display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  

  input, select, button {
    border: 1px solid #00A9DC;
    box-sizing: border-box;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 0.9rem;
    outline: none;
    padding: 0.7rem 0.65rem;
    text-align: center;
    transition: all 0.3s;
    
    &::placeholder{
      color: #696969;
    }
  }
  button {
    @extend input;
    cursor: pointer;
    background: #fff;
  }
  select{
    text-align: left;
  }
  // input[type='text'] {
  //   min-width: 15%;
  //   width: 25%;
  // }

  button.selected {
    background: #00A9DC;
    transition: all 0.3s ease;
    color: #fff;
  }
  
  
}


.header {
  @include flexVertical;
  align-items: flex-start;
  gap: 1.8rem;
}
.exam__info {
  @extend .header;
  gap: 1rem;

  width: 100%;
  .exam__header{
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 28px;
    color: #00A9DC;
  }

  .header__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1.3rem;
    width: 100%;

    .exam__img{
      background: #CFCFCF;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 18px;
      width: 100%;
      height: 140px;
      overflow: hidden;

      img{
        width: 100%;
        height: 100%;
        border-radius: 18px;
        object-fit: cover;
        background-position: center center;
      }
    }

    .item2{
      @include flexVertical;
      align-items: flex-start;
      justify-content: space-evenly;
      h3{
        font-weight: bold;
        font-size: 1.1rem;
        line-height: 25px;
        color: #00A9DC;
      }
      p{
        &:nth-child(odd) {
          font-size: 14px;
          line-height: 17px;
          color: #000000d3;
          font-weight: 500;
        
        }
        &:nth-child(even){
          font-size: 12px;
          line-height: 15px;
          color: #000000b3;
          font-weight: 500;
        }
      }
      
    }

    .item3{
      @include flexVertical;
      align-items: flex-start;
      justify-content: space-between;
      div h3{
        font-weight: bold;
        font-size: 16px;
        line-height: 18px;
        color: #00A9DC;
        margin-bottom: 0.3rem;
      }

      .more__info{
        display: flex;
        align-items: center;
        gap: 0.3rem;

        .group{
          @include flexVertical;
          gap: 0.2rem;
          .label{
            font-weight: normal;
            font-size: 10px;
            line-height: 11px;
            letter-spacing: -0.011em;
            color: #000000;
          }
          .value {
            font-size: 10px;
            letter-spacing: -0.011em;
            color: #000000;
            border: 1px solid #00A9DC;
            box-sizing: border-box;
            border-radius: 5px;
            padding:  0.4rem 0.8rem;
          }
        }
      }
      .mark__info{
        .group {
          .label {
            font-size: 9px;
            line-height: 10px;
          }
          .value {
            border-radius: 0;
            text-align: center;
            padding: 0.3rem 1.1rem
          }
        }
      }
    }

    .item4{
          @include flexVertical;
          align-items: flex-start;
          justify-content: space-evenly;
          h3{
            font-weight: bold;
            font-size: 16px;
            line-height: 17px;
            letter-spacing: -0.011em;
            color: #00A9DC;
          }
          div.infos p{
            font-size: 13px;
            line-height: 15px;
            letter-spacing: -0.011em;
            color: #000000c7;
            font-weight: 500;
            margin: 0.2rem 0;
          }
    
          .view__btn {
            border: none;
            outline: none;
            background: #00A9DC;
            color: #fff;
            padding: 7px 10px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 14px;
          }
    
          .negativeMark {
            display: flex;
            gap: 0.18rem;
            place-items: center;
    
            p{
              font-weight: 600;
              font-size: 0.8rem;
              margin-right: 0.2rem;
            }
          }
          .switches {
          width: 100%;
          display: grid;
          grid-template-columns: 2fr 1fr;
          align-items: center;
    
          .switch {
            display: inline-flex;
          }
          .switch.ngMark {
            place-items: center;
            
          }
          
    
          .totalTime {
            max-width: 80px;
          }
    
        }
        .ngMark1 {
          min-height: 52.88px;
        }
        }
    


  }


} 
</style>