<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size.width"
    :height="size.height"
    viewBox="0 0 36 32"
    fill="none"
  >
    <path
      d="M9 4H27V16C27 20.4183 22.9706 24 18 28C13.0294 24 9 20.4183 9 16V4Z"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  color: { type: String, default: '#C8A654' },
  strokeWidth: { type: [Number, String], default: 2 },
  size: { type: Object, default: () => ({ width: 36, height: 32 }) }
})
</script>
