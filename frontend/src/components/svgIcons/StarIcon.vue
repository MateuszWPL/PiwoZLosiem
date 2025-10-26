<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="size.width"
       :height="size.height"
       viewBox="0 0 36 32"
       fill="none"
       stroke="currentColor"
       :stroke-width="strokeWidth">
    <path d="M18 2L21.09 11.26L31 12.27L23.5 18.97L25.82 28L18 23L10.18 28L12.5 18.97L5 12.27L14.91 11.26L18 2Z"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
defineProps({
  strokeWidth: { type: [Number, String], default: 2 },
  size: { type: Object, default: () => ({ width: 36, height: 32 }) }
})
</script>