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
</script>

<template>
  <div class="row" style="min-height: 100vh">
    <div class="col-sm-4">
      <a-radio-group v-model:value="picker">
        <a-radio-button value="week">Week</a-radio-button>
        <a-radio-button value="month">Month</a-radio-button>
        <a-radio-button value="quarter">Quarter</a-radio-button>
        <a-radio-button value="year">Year</a-radio-button>
      </a-radio-group>
      <br />
      <br />
      <a-space direction="vertical" :size="12">
        <a-range-picker v-model:value="data" :picker="picker" @change="handleDateChange" />
      </a-space>
    </div>
    <div class="col-sm-8">
      <Bar :data="dataChart" :options="options" />
    </div>
  </div>
</template>
