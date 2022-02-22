<template>
  <div>
    <apexchart
      :type="type"
      width="100%"
      height="260"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  name: 'StatsChart',
  props: {
    chartPercents: {
      type: Array
    }
  },
  setup(props) {
    const seriesData = props.chartPercents.slice(0, 10)
    // console.log(seriesData)
    const subs = seriesData.map(d => d?.exam_name)
    const percents = seriesData.map(d => d?.percent)
    const type = ref('bar');
    const chartOptions = ref({
      chart: {
        id: "vuechart-example",
      },
      responsive: [{
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          
        }
      }],
      xaxis: {
        categories: [...subs],
      },
      yaxis: {
        min: 0
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
    })

    const series = ref([{
        name: "Average Percent",
        data: [...percents],
      },
    ])


 


    return {
      type,
      chartOptions,
      series,
    }
  }

};
</script>
