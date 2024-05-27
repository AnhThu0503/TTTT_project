<template>
  <div class="mb-3 card">
    <div :style="{ backgroundColor: backgroundColor }" class="p-3 pb-0 card-body custom-card-body">
      <div class="d-flex flex-row justify-content-between align-items-center custom-flex-container">
        <div>
          <div class="numbers">
            <div class="custom-shape-divider-top">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path
                  d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                  :style="{ fill: darkenedBackgroundColor }" class="shape-fill"></path>
              </svg>
            </div>
            <div class="mt-2">
              <h5 class="mb-0 font-weight-bolder text-white">
                {{ title }}
              </h5>
              <p v-if="description" class="mt-2 text-white">{{ description }}</p>
            </div>
          </div>
        </div>
        <div :style="{ backgroundColor: darkenedBackgroundColor }" class="icon-container">
          <i class="fa fa-5x opacity-10 h5 mt-1" :class="icon" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.custom-card-body {
  position: relative;
  border-radius: 4px;
}

.custom-flex-container {
  width: 220px;
}

.custom-shape-divider-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  border-radius: 4px;
}

.custom-shape-divider-top svg {
  z-index: -1;
  position: relative;
  display: block;
  width: calc(106% + 1.3px);
  height: 100%;
}

.icon-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container i {
  color: white;
  -webkit-text-stroke: 0.2px;
}

.text-white {
  color: white;
}
</style>

<script setup>
import { ref, computed } from 'vue';

// Define the props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    required: true,
  },
});

// Function to darken the color
function darkenColor(color, amount) {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) - amount;
  if (r < 0) r = 0;
  else if (r > 255) r = 255;

  let g = ((num >> 8) & 0x00ff) - amount;
  if (g < 0) g = 0;
  else if (g > 255) g = 255;

  let b = (num & 0x0000ff) - amount;
  if (b < 0) b = 0;
  else if (b > 255) b = 255;

  return (usePound ? "#" : "") + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

const darkenedBackgroundColor = computed(() => darkenColor(props.backgroundColor, 20));
</script>
