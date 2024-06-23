<!-- eslint-disable no-case-declarations -->
<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import weekday from 'dayjs/plugin/weekday'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(weekday)
dayjs.extend(quarterOfYear)

const data = ref<[Dayjs, Dayjs]>()
const picker = ref<'week' | 'month' | 'quarter' | 'year'>('week')
const startDate = ref<Dayjs | null>(null)
const endDate = ref<Dayjs | null>(null)
const valuesRanges = ref<Array<[Dayjs, Dayjs]>>([])

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const placement = ref('topLeft' as const)
const dataChart = ref({
  labels: [],
  datasets: [
    {
      label: 'Total Amount',
      backgroundColor: [],
      data: []
    }
  ]
})

const options = {
  responsive: true,
  maintainAspectRatio: false
}

const handleDateChange = (value: [Dayjs, Dayjs]) => {
  data.value = value
  if (data.value) {
    const [start, end] = data.value
    switch (picker.value) {
      case 'week':
        startDate.value = dayjs(start).startOf('week')
        endDate.value = dayjs(end).endOf('week')
        valuesRanges.value = []
        let currentWeek = dayjs(startDate.value)
        while (currentWeek.isSameOrBefore(endDate.value, 'week')) {
          const weekStart: any = dayjs(currentWeek.startOf('week')).format('YYYY-MM-DD')
          const weekEnd: any = dayjs(currentWeek.endOf('week')).format('YYYY-MM-DD')
          valuesRanges.value.push([weekStart, weekEnd])
          currentWeek = currentWeek.add(1, 'week')
        }
        break

      case 'month':
        startDate.value = dayjs(start).startOf('month')
        endDate.value = dayjs(end).endOf('month')

        valuesRanges.value = []
        let currentMonth = dayjs(startDate.value)
        while (currentMonth.isSameOrBefore(endDate.value, 'month')) {
          const monthStart: any = dayjs(currentMonth.startOf('month')).format('YYYY-MM-DD')
          const monthEnd: any = dayjs(currentMonth.endOf('month')).format('YYYY-MM-DD')
          valuesRanges.value.push([monthStart, monthEnd])
          currentMonth = currentMonth.add(1, 'month')
        }
        break

      case 'quarter':
        startDate.value = dayjs(start).startOf('quarter')
        endDate.value = dayjs(end).endOf('quarter')

        valuesRanges.value = []
        let currentQuarter = dayjs(startDate.value)
        while (currentQuarter.isSameOrBefore(endDate.value)) {
          const quarterStart: any = dayjs(currentQuarter.startOf('quarter')).format('YYYY-MM-DD')
          const quarterEnd: any = dayjs(currentQuarter.endOf('quarter')).format('YYYY-MM-DD')
          valuesRanges.value.push([quarterStart, quarterEnd])
          currentQuarter = currentQuarter.add(1, 'quarter')
        }
        break

      case 'year':
        startDate.value = dayjs(start).startOf('year')
        endDate.value = dayjs(end).endOf('year')

        valuesRanges.value = []
        let currentYear: any = dayjs(startDate.value)
        while (currentYear.isSameOrBefore(endDate.value, 'year')) {
          const yearStart: any = dayjs(currentYear.startOf('year')).format('YYYY-MM-DD')
          const yearEnd: any = dayjs(currentYear.endOf('year')).format('YYYY-MM-DD')
          valuesRanges.value.push([yearStart, yearEnd])
          currentYear = currentYear.add(1, 'year')
        }
        break
    }
  }
}

// Insert data into dataChart
const insertDataIntoChart = (dataResponse: any) => {
  dataChart.value.labels = dataResponse.map((item: any) => item.categoryName)
  dataChart.value.datasets[0].data = dataResponse.map((item: any) => item.totalAmount)
  dataChart.value.datasets[0].backgroundColor = dataResponse.map((item: any) =>
    item.categoryType === 0 ? '#FFCC99' : '#99CC99'
  )
}

// Provided data
const dataResponse = [
  {
    categoryType: 0,
    categoryName: 'Ăn uống',
    totalAmount: 50000,
    transactionCount: 2
  },
  {
    categoryType: 1,
    categoryName: 'Lương',
    totalAmount: 500000,
    transactionCount: 1
  }
]

// Insert the provided data into the chart
insertDataIntoChart(dataResponse)

watch(picker, () => {
  if (data.value) {
    handleDateChange(data.value)
  }
})

//detail
const columns = [
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: 'Thu',
    dataIndex: 'income',
    key: 'income'
  },
  {
    title: 'Chi',
    dataIndex: 'expenses',
    key: 'expenses'
  }
]

const dataDetail = [
  {
    key: '1',
    time: 'John Brown',
    income: '￥300,000.00',
    expenses: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    time: 'Jim Green',
    income: '￥1,256,000.00',
    expenses: 'London No. 1 Lake Park'
  }
]
</script>

<template>
  <div class="col-sm-12 d-flex" style="box-sizing: border-box">
    <a-radio-group v-model:value="picker" class="me-4 pe-4">
      <a-radio-button value="week">Tuần</a-radio-button>
      <a-radio-button value="month">Tháng</a-radio-button>
      <a-radio-button value="quarter">Quý</a-radio-button>
      <a-radio-button value="year">Năm</a-radio-button>
    </a-radio-group>
    <a-space direction="vertical" :size="12" class="me-4 pe-4">
      <a-range-picker v-model:value="data" :picker="picker" @change="handleDateChange" />
    </a-space>
    <a-radio-group v-model:value="placement" class="me-4 pe-4">
      <a-radio-button value="topLeft">Pie</a-radio-button>
      <a-radio-button value="topRight">Line</a-radio-button>
      <a-radio-button value="bottomLeft">Bar</a-radio-button>
    </a-radio-group>
  </div>
  <div class="col-sm-12 mt-4 p-4" style="background-color: #fff; border-radius: 10px">
    <Bar
      :data="dataChart"
      :options="options"
      style="font-family: Roboto, Helvetica, Arial, sans-serif; font-size: 18px"
    />
  </div>
  <div class="col-sm-12 mt-4">
    <a-table :columns="columns" :data-source="dataDetail" bordered>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'time'">
          <a>{{ text }}</a>
        </template>
      </template>
      <template #title>Chi tiết thống kê</template>
    </a-table>
  </div>
</template>
<style scoped>
#title {
  text-align: left !important;
}
</style>
