<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="size.width"
       :height="size.height"
       viewBox="0 0 36 32"
       fill="none"
       stroke="currentColor"
       :stroke-width="strokeWidth">
    <path d="M24 4H12V8C12 9.06087 12.4214 10.0783 13.1716 10.8284C13.9217 11.5786 14.9391 12 16 12H20C21.0609 12 22.0783 11.5786 22.8284 10.8284C23.5786 10.0783 24 9.06087 24 8V4Z"
          stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 4H8C8 4 6 12 12 12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 4H28C28 4 30 12 24 12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 12V16H20V12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 16H20C21.0609 16 22.0783 16.4214 22.8284 17.1716C23.5786 17.9217 24 18.9391 24 20V28H12V20C12 18.9391 12.4214 17.9217 13.1716 17.1716C13.9217 16.4214 14.9391 16 16 16Z"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
defineProps({
  strokeWidth: { type: [Number, String], default: 2 },
  size: { type: Object, default: () => ({ width: 36, height: 32 }) }
})
</script>
