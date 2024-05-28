<script setup lang="ts">
import { ref } from 'vue'
import { Dayjs } from 'dayjs'

// Define the interface for grouped data
interface GroupedData {
  [key: string]: {
    type: string
    totalAmount: number
    descriptions: string[]
  }
}

const value = ref<Dayjs>()

const transactions = [
  {
    transactionID: '1',
    transactionDes: 'Ăn cơm sườn',
    transactionAmount: 32000,
    transactionDate: '2024-05-28',
    categoryID: 1,
    categoryType: 'chi',
    userID: 1
  },
  {
    transactionID: '2',
    transactionDes: 'Ăn cơm gà',
    transactionAmount: 32000,
    transactionDate: '2024-05-29',
    categoryID: 1,
    categoryType: 'chi',
    userID: 1
  },
  {
    transactionID: '3',
    transactionDes: 'Ăn cơm tấm',
    transactionAmount: 32000,
    transactionDate: '2024-05-30',
    categoryID: 1,
    categoryType: 'chi',
    userID: 1
  },
  {
    transactionID: '4',
    transactionDes: 'Lãnh lương',
    transactionAmount: 50000,
    transactionDate: '2024-05-30',
    categoryID: 12,
    categoryType: 'thu',
    userID: 1
  },
  {
    transactionID: '5',
    transactionDes: 'Uống lasimi',
    transactionAmount: 32000,
    transactionDate: '2024-05-30',
    categoryID: 1,
    categoryType: 'chi',
    userID: 1
  }
]

const getListData = (value: Dayjs) => {
  const dateStr = value.format('YYYY-MM-DD') // Format the date as a string

  const groupedData = transactions
    .filter((transaction) => transaction.transactionDate === dateStr)
    .reduce((acc: GroupedData, transaction) => {
      const { categoryType, transactionAmount, transactionDes } = transaction
      if (!acc[categoryType]) {
        acc[categoryType] = {
          type: categoryType === 'thu' ? 'success' : 'error',
          totalAmount: 0,
          descriptions: []
        }
      }
      acc[categoryType].totalAmount += transactionAmount
      acc[categoryType].descriptions.push(transactionDes)
      return acc
    }, {} as GroupedData)

  const listData = Object.values(groupedData).map((group) => ({
    type: group.type,
    content: `${group.totalAmount}`
  }))

  return listData
}

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394
  }
}
</script>

<template>
  <div class="d-flex" style="background-color: '#fff">
    <div class="d-flex me-4">
      <i class="bi bi-circle-fill me-2" style="color: #52c41a"></i>
      <p class="p-0 m-0">Thu</p>
    </div>
    <div class="d-flex">
      <i class="bi bi-circle-fill me-2" style="color: #fe5558"></i>
      <p class="p-0 m-0">Chi</p>
    </div>
  </div>
  <a-calendar v-model:value="value" class="p-4">
    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="item in getListData(current)" :key="item.content">
          <a-badge :status="item.type" :text="item.content" />
        </li>
      </ul>
    </template>
    <!-- <template #monthCellRender="{ current }">
      <div v-if="getMonthData(current)" class="notes-month">
        <section>{{ getMonthData(current) }}</section>
        <span>Backlog number</span>
      </div>
    </template> -->
  </a-calendar>
</template>

<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
