<script lang="ts" setup>
import siderbar from './components/siderbar.vue'
import { ref } from 'vue'
const value = ref<string>('')

const onSearch = (searchValue: string) => {
  console.log('use value', searchValue)
  console.log('or use this.value', value.value)
}
</script>
<template>
  <a-layout has-sider>
    <siderbar />
    <a-layout :style="{ marginLeft: '250px' }">
      <a-layout-header :style="{ background: '#fff' }">
        <a-input-search
          v-model:value="value"
          size="large"
          placeholder="input search text"
          style="width: 350px; padding-top: 20px; margin-left: 100px"
          @search="onSearch"
        />
      </a-layout-header>
      <hr style="margin-top: 24px" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial', minHeight: '85vh' }">
        <div :style="{ padding: '24px', backgroundColor: 'rgb(245 245 245)', textAlign: 'center' }">
          <router-view />
        </div>
      </a-layout-content>
      <!-- <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<style scoped>
.site-layout .site-layout-background {
  background-color: rgb(245 245 245) !important;
  width: 250px !important;
}
.ant-layout-header {
  background-color: rgb(245 245 245) !important;
}
.ant-layout-content {
  background-color: rgb(245 245 245) !important;
}
</style>
