<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size.width"
    :height="size.height"
    viewBox="0 0 36 32"
    fill="none"
    :stroke="color"
    :stroke-width="strokeWidth"
    class="stroke-current"
  >
    <path
      d="M33 9.3335L20.25 20.6668L12.75 14.0002L3 22.6668"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M24 9.3335H33V17.3335"
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
