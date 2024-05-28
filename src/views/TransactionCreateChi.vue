<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { SelectProps } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import { Dayjs } from 'dayjs'
import { useRouter } from 'vue-router'
import MiniStatisticsCard from './MiniStatisticsCard.vue'

const loai = ref<SelectProps['value']>('chi') // Set default value to "chi"
const router = useRouter() // Initialize the router

watch(loai, (newValue) => {
  if (newValue === 'thu') {
    // router.push('/about')
  }
})

const onChange = (date: Dayjs | string, dateString: string) => {
  console.log(date, dateString)
}

const onRangeChange = (date: [Dayjs, Dayjs], dateString: [string, string]) => {
  console.log(date, dateString)
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}

const validateMessages = {
  required: '${label} is required!'
}

const formState = reactive({
  transaction: {
    ngayTao: '',
    ghiChu: undefined,
    soTien: 0,
    danhMuc: undefined,
    loai: ''
  }
})

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const categories = [
  {
    name: 'Tiền nhà',
    description: 'chi tiết...',
    icon: 'bi-house-heart',
    backgroundColor: '#52c290'
  },
  {
    name: 'Liên lạc',
    description: 'chi tiết...',
    icon: 'bi bi-whatsapp',
    backgroundColor: '#3f81bb'
  },
  { name: 'Tiền điện', description: 'chi tiết...', icon: 'bi-plugin', backgroundColor: '#f97171' },
  { name: 'Quẩn áo', description: 'chi tiết...', icon: 'bi-backpack2', backgroundColor: '#f4a11f' },
  {
    name: 'Y tế',
    description: 'chi tiết...',
    icon: 'bi-clipboard2-pulse',
    backgroundColor: '#53b4f8'
  },
  { name: 'Giáo dục', description: 'chi tiết...', icon: 'bi-backpack', backgroundColor: '#CCFF66' },
  { name: 'Chi tiêu', description: 'chi tiết...', icon: 'bi-cart', backgroundColor: '#DDDDDD' },
  { name: 'Mỹ phẩm', description: 'chi tiết...', icon: 'bi-flower2', backgroundColor: '#FF6633' }
]
</script>
<template>
  <div class="container-content d-flex" style="justify-content: space-between">
    <div class="box-left col-sm-5">
      <div>
        <div class="card card-plain">
          <div class="card-header text-center">
            <a-radio-group v-model:value="loai">
              <a-radio-button value="chi" size="large">Khoản chi</a-radio-button>
              <a-radio-button value="thu" size="large">Khoản thu</a-radio-button>
            </a-radio-group>
          </div>
          <div class="card-body">
            <a-form
              :model="formState"
              v-bind="layout"
              name="nest-messages"
              :validate-messages="validateMessages"
              @finish="onFinish"
            >
              <a-form-item
                :name="['transaction', 'soTien']"
                label="Số tiền"
                :rules="[{ type: 'number', min: 0, required: true }]"
              >
                <a-input-number v-model:value="formState.transaction.soTien" size="large" />
              </a-form-item>
              <a-form-item
                :name="['transaction', 'ngayTao']"
                label="Ngày tạo"
                :rules="[{ required: true }]"
              >
                <a-date-picker
                  @change="onChange"
                  v-model:value="formState.transaction.ngayTao"
                  placeholder="Select date"
                  size="large"
                >
                  <template #suffixIcon>
                    <SmileOutlined />
                  </template>
                </a-date-picker>
              </a-form-item>

              <a-form-item
                :name="['transaction', 'danhMuc']"
                label="Danh mục"
                :rules="[{ required: true }]"
              >
                <a-input v-model:value="formState.transaction.danhMuc" />
              </a-form-item>
              <a-form-item
                :name="['transaction', 'ghiChu']"
                label="Ghi chú"
                :rules="[{ type: 'text' }]"
              >
                <a-input v-model:value="formState.transaction.ghiChu" size="large" />
              </a-form-item>

              <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 4 }">
                <a-button type="primary" html-type="submit" size="large">Tạo khoản chi</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <div class="box-right col-sm-6">
      <!-- Iterate over categories -->
      <p>Chọn danh mục</p>
      <div class="d-flex flex-wrap">
        <template v-for="(category, index) in categories" :key="category.name">
          <div class="m-1">
            <mini-statistics-card
              :title="`${category.name}`"
              :description="`${category.description}`"
              :icon="`${category.icon}`"
              :backgroundColor="`${category.backgroundColor}`"
            />
          </div>
          <!-- Insert line break after every third category -->
          <br v-if="(index + 1) % 3 === 0 && index !== categories.length - 1" />
        </template>
      </div>
      <!-- Button for editing -->
      <a-button class="btn btn-primary mt-3" size="large">Chỉnh sửa</a-button>
    </div>
  </div>
</template>
