<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
const selectedKeys = ref<string[]>(['4'])
</script>

<template>
  <a-layout-sider
    :style="{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      background: '#212120'
    }"
  >
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
      <a-menu-item key="1" class="my-4 pb-2">
        <img src="../assets//Transaction.png" alt="" style="height: 60px; width: 100%" />
      </a-menu-item>
      <hr />
      <a-menu-item key="2">
        <a-avatar-group>
          <a href="https://www.antdv.com">
            <a-avatar style="background-color: #f56a00">T</a-avatar>
          </a>
          <p class="p-0 m-0 ms-2 name-user">Anh Thư</p>
        </a-avatar-group>
      </a-menu-item>
      <hr />
      <a-menu-item key="3">
        <user-outlined />
        <span class="nav-text">nav 1</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.ant-layout-sider {
  max-width: 250px !important;
  min-width: 250px !important;
  width: 250px !important;
  background: #212120 !important;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #212120 !important;
}
.ant-menu:hover {
  color: #fff !important;
}
.ant-menu {
  background: #212120 !important;
  transition-property: top, bottom;
  transition-duration: 0.2s, 0.2s, 0.35s;
  transition-timing-function: linear, linear, ease;
}
.ant-menu-item {
  background-color: transparent !important;
}
.ant-menu-item:hover {
  opacity: 0.7 !important ;
  white-space: nowrap !important;
  transition: all 0.15s ease-in !important;
}
.ant-menu-item-selected {
  color: #1677ff !important;
}
.ant-menu-light {
  color: #fff !important;
}
.ant-menu-light:hover {
  color: #fff !important;
}
.ant-menu-light:hover {
  color: #fff !important;
}
.nav-text {
  line-height: 30px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  transform: translateZ(0);
  opacity: 1;
  font-family: Muli, Arial, sans-serif;
}

.name-user {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
