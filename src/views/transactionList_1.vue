<script setup lang="ts">
import { ref } from 'vue'
import { reactive, toRaw, computed } from 'vue'
import { Form } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { FilterOutlined } from '@ant-design/icons-vue'
// Initialize the form and the date value
const useForm = Form.useForm
const modelRef = reactive({
  categoryID: 1,
  categoryName: 'Ăn uống',
  transactionID: 1,
  transactionDate: '2024-05-29', // String date
  transactionAmount: 32000,
  transactionDescription: 'Ăn cơm sườn'
})
const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
const value1 = ref<Dayjs | null>(dayjs(modelRef.transactionDate)) // Convert string to Dayjs

const rulesRef = reactive({
  categoryName: [
    {
      required: true,
      message: 'Please input category name'
    }
  ],
  transactionAmount: [
    {
      required: true,
      message: 'Please input transaction amount'
    }
  ],
  transactionDate: [
    {
      required: true,
      message: 'Please select date'
    }
  ]
})

const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args)
})

const onSubmit = () => {
  validate()
    .then(() => {
      // Set the transactionDate back to the model as string
      //   modelRef.transactionDate = value1.value?.format('YYYY-MM-DD')
      console.log(toRaw(modelRef))
      open.value = false
    })
    .catch((err) => {
      console.log('error', err)
    })
}

const open = ref<boolean>(false)

const showModal = () => {
  open.value = true
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}

const columns = [
  {
    title: 'Danh mục',
    dataIndex: 'categoryName',
    key: 'categoryName'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'transactionDate',
    key: 'transactionDate'
  },
  {
    title: 'Số tiền',
    dataIndex: 'transactionAmount',
    key: 'transactionAmount'
  },
  {
    title: 'Mô tả',
    key: 'transactionDescription',
    dataIndex: 'transactionDescription'
  },
  {
    title: 'Loại',
    key: 'categoryType',
    dataIndex: 'categoryType'
  },
  {
    title: '',
    key: 'action',
    dataIndex: 'action'
  }
]

const data = [
  {
    key: '1',
    categoryName: 'Ăn uống',
    transactionDate: '2024-05-29',
    transactionAmount: '32000',
    transactionDescription: 'Ăn cơm sườn',
    categoryType: 'Chi'
  },
  {
    key: '2',
    categoryName: 'Tiền lương',
    transactionDate: '2024-05-29',
    transactionAmount: '500000',
    transactionDescription: 'Lãnh lương',
    categoryType: 'Thu'
  }
]
const minAmount = ref<number | null>(null)
const maxAmount = ref<number | null>(null)
const startDate = ref<Dayjs | null>(null)
const endDate = ref<Dayjs | null>(null)
const filteredData = computed(() => {
  return data.filter((item) => {
    const amount = parseInt(item.transactionAmount.toString())
    const date = dayjs(item.transactionDate)
    const isAmountInRange =
      (minAmount.value === null || amount >= minAmount.value) &&
      (maxAmount.value === null || amount <= maxAmount.value)
    const isDateInRange =
      (startDate.value === null ||
        date.isAfter(startDate.value, 'day') ||
        date.isSame(startDate.value, 'day')) &&
      (endDate.value === null ||
        date.isBefore(endDate.value, 'day') ||
        date.isSame(endDate.value, 'day'))
    return isAmountInRange && isDateInRange
  })
})
</script>

<template>
  <div class="d-flex">
    <div class="d-flex my-3 pe-4 me-4">
      <div class="card-icon me-2">
        <FilterOutlined class="icon fs-4" />
      </div>
      <a-input-number
        size="large"
        v-model:value="minAmount"
        placeholder="Số tiền từ..."
        style="width: 200px"
      />
      <a-input-number
        size="large"
        v-model:value="maxAmount"
        placeholder="Đến"
        style="margin-left: 10px; width: 200px"
      />
    </div>
    <div class="d-flex my-3 ps-4">
      <div class="card-icon2">
        <FilterOutlined class="icon fs-4" />
      </div>
      <a-date-picker
        size="large"
        v-model:value="startDate"
        placeholder="Từ ngày"
        style="margin-left: 10px"
      />
      <a-date-picker
        size="large"
        v-model:value="endDate"
        placeholder="Đến ngày"
        style="margin-left: 10px"
      />
    </div>
  </div>

  <a-table :columns="columns" :data-source="filteredData">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'categoryName'">
        <span style="font-weight: 600">Danh mục</span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'categoryName'">
        <a>
          {{ record.categoryName }}
        </a>
      </template>
      <template v-else-if="column.key === 'categoryType'">
        <span>
          <a-tag
            :key="record.categoryType"
            :color="record.categoryType === 'Chi' ? 'red' : 'green'"
          >
            {{ record.categoryType }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-button type="primary" ghost @click="showModal">Edit</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" danger ghost>Delete</a-button>
        </span>
        <a-modal v-model:open="open" width="1000px" title="Basic Modal" @ok="handleOk">
          <a-form
            :model="modelRef"
            :rules="rulesRef"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="Mô tả" v-bind="validateInfos.transactionDescription">
              <a-input v-model:value="modelRef.transactionDescription" />
            </a-form-item>
            <a-form-item label="Danh mục" v-bind="validateInfos.categoryName">
              <a-select v-model:value="modelRef.categoryName" placeholder="please select your zone">
                <a-select-option value="1">Ăn uống</a-select-option>
                <a-select-option value="2">Đi lại</a-select-option>
                <a-select-option value="3">Liên lạc</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Số tiền" v-bind="validateInfos.transactionAmount">
              <a-input v-model:value="modelRef.transactionAmount" />
            </a-form-item>
            <a-form-item label="Ngày tạo" v-bind="validateInfos.transactionDate">
              <a-date-picker v-model:value="value1" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click.prevent="onSubmit">Lưu</a-button>
              <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
            </a-form-item>
          </a-form>
        </a-modal>
      </template>
    </template>
  </a-table>
</template>
<style scoped>
.card-icon {
  background: linear-gradient(60deg, #ffa726, #fb8c00);
  box-shadow:
    0 12px 20px -10px rgba(255, 152, 0, 0.28),
    0 4px 20px 0 rgba(0, 0, 0, 0.12),
    0 7px 8px -5px rgba(255, 152, 0, 0.2);
  border-radius: 5px;
  width: 50px;
}
.card-icon2 {
  background: linear-gradient(60deg, #66bb6a, #43a047);
  box-shadow:
    0 12px 20px -10px rgba(76, 175, 80, 0.28),
    0 4px 20px 0 rgba(0, 0, 0, 0.12),
    0 7px 8px -5px rgba(76, 175, 80, 0.2);
  border-radius: 5px;
  width: 50px;
}
.icon {
  text-align: center;
  line-height: 33px;
  color: #fff;
}
</style>
