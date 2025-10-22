<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="size.width"
       :height="size.height"
       viewBox="0 0 21 21"
       fill="none"
       :stroke="stroke"
       :stroke-width="strokeWidth">
    <path d="M17.25 6.75L6.75 17.25M6.75 6.75l10.5 10.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
defineProps({
  strokeWidth: { type: [Number, String], default: 2 },
  size: { type: Object, default: () => ({ width: 21, height: 21 }) },
  stroke: { type: String, default: 'currentColor' }
})
</script>