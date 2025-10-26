<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="size.width"
       :height="size.height"
       viewBox="0 0 36 32"
       fill="none"
       stroke="currentColor"
       :stroke-width="strokeWidth">
    <path d="M9 4L27 4L27 20L18 28L9 20L9 4Z"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
defineProps({
  strokeWidth: { type: [Number, String], default: 2 },
  size: { type: Object, default: () => ({ width: 36, height: 32 }) }
})
</script>