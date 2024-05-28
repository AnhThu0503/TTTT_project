<script setup lang="ts">
import { defineProps } from 'vue'

type TitleProp = string | { text: string; color: string }

const props = defineProps<{
  title: TitleProp
  value: string | number
  description?: string
  icon?: string
}>()
</script>

<template>
  <div class="mb-3 card">
    <div class="p-3 card-body">
      <div class="d-flex flex-row flex-dir justify-content-between">
        <div>
          <div class="numbers">
            <p
              class="mb-0 text-sm text-uppercase font-weight-bold"
              :style="{ color: typeof props.title === 'object' ? props.title.color : undefined }"
            >
              {{ typeof props.title === 'string' ? props.title : props.title.text }}
            </p>
            <h5 class="mb-0 font-weight-bolder">
              {{ props.value }}
            </h5>
            <p v-if="props.description" class="mt-2 mb-0" v-html="props.description"></p>
          </div>
        </div>
        <div class="text-center icon icon-shape m-3">
          <i class="fa fa-5x opacity-10" :class="props.icon" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>
