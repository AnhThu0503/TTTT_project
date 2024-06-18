<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import weekday from 'dayjs/plugin/weekday'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(weekday)
dayjs.extend(quarterOfYear)

const data = ref<Dayjs | null>(null)
const picker = ref<'week' | 'month' | 'quarter' | 'year'>('week')
const startDate = ref()
const endDate = ref()
const handleDateChange = (value: Dayjs) => {
  data.value = value
  if (data.value) {
    switch (picker.value) {
      case 'week':
        startDate.value = dayjs(data.value).startOf('week')
        endDate.value = dayjs(data.value).endOf('week')
        console.log('Start of week:', startDate.value.format('YYYY-MM-DD'))
        console.log('End of week:', endDate.value.format('YYYY-MM-DD'))
        break
      case 'month':
        startDate.value = dayjs(data.value).startOf('month')
        endDate.value = dayjs(data.value).endOf('month')
        console.log('Start of month:', startDate.value.format('YYYY-MM-DD'))
        console.log('End of month:', endDate.value.format('YYYY-MM-DD'))
        break
      case 'quarter':
        startDate.value = dayjs(data.value).startOf('quarter')
        endDate.value = dayjs(data.value).endOf('quarter')
        console.log('Start of quarter:', startDate.value.format('YYYY-MM-DD'))
        console.log('End of quarter:', endDate.value.format('YYYY-MM-DD'))
        break
      case 'year':
        startDate.value = dayjs(data.value).startOf('year')
        endDate.value = dayjs(data.value).endOf('year')
        console.log('Start of year:', startDate.value.format('YYYY-MM-DD'))
        console.log('End of year:', endDate.value.format('YYYY-MM-DD'))
        break
      default:
        console.log('data', dayjs(data.value).format('YYYY-MM-DD'))
    }
  }
}

// Watch picker changes to handle specific cases
watch(picker, (newPicker) => {
  if (data.value) {
    handleDateChange(data.value)
  }
})
</script>

<template>
  <!-- SELECT SUM(t.transactionAmount) AS totalAmount
FROM transaction t
JOIN category c ON t.categoryID = c.categoryID
WHERE t.userID = 23
  AND t.isDeleted = 0
  AND c.categoryType = 0
  AND t.transactionDate BETWEEN '2024-06-11' AND '2024-06-18'; -->
  <a-radio-group v-model:value="picker">
    <a-radio-button value="week">Week</a-radio-button>
    <a-radio-button value="month">Month</a-radio-button>
    <a-radio-button value="quarter">Quarter</a-radio-button>
    <a-radio-button value="year">Year</a-radio-button>
  </a-radio-group>
  <br />
  <br />
  <a-space direction="vertical" :size="12">
    <a-date-picker v-model:value="data" :picker="picker" @change="handleDateChange" />
  </a-space>
</template>
