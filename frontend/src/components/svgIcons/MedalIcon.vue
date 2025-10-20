<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size.width"
    :height="size.height"
    viewBox="0 0 36 32"
    fill="none"
    :stroke="color"
    :stroke-width="strokeWidth"
  >
    <circle
      cx="18"
      cy="12"
      r="6"
    />
    <path
      d="M12 20L10 30L18 26L26 30L24 20"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'currentColor' },
  strokeWidth: { type: [Number, String], default: 2 },
  size: { type: Object, default: () => ({ width: 36, height: 32 }) }
})
</script>