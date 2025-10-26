<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size.width"
    :height="size.height"
    viewBox="0 0 36 32"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
  >
    <path d="M24 28V25.3333C24 23.9188 23.3679 22.5623 22.2426 21.5621C21.1174 20.5619 19.5913 20 18 20H9C7.4087 20 5.88258 20.5619 4.75736 21.5621C3.63214 22.5623 3 23.9188 3 25.3333V28" 
      stroke-linecap="round" 
      stroke-linejoin="round"/>
    <path d="M13.5 14.6667C16.8137 14.6667 19.5 12.2789 19.5 9.33333C19.5 6.38781 16.8137 4 13.5 4C10.1863 4 7.5 6.38781 7.5 9.33333C7.5 12.2789 10.1863 14.6667 13.5 14.6667Z" 
      stroke-linecap="round" 
      stroke-linejoin="round"/>
    <path d="M33 28V25.3333C32.999 24.1516 32.5565 23.0037 31.742 22.0698C30.9276 21.1358 29.7872 20.4688 28.5 20.1733" 
      stroke-linecap="round" 
      stroke-linejoin="round"/>
    <path d="M24 4.17334C25.2906 4.46707 26.4346 5.13427 27.2515 6.06975C28.0684 7.00523 28.5118 8.15578 28.5118 9.34001C28.5118 10.5242 28.0684 11.6748 27.2515 12.6103C26.4346 13.5457 25.2906 14.2129 24 14.5067" 
      stroke-linecap="round" 
      stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
defineProps({
  strokeWidth: { type: [Number, String], default: 2 },
  size: { type: Object, default: () => ({ width: 36, height: 32 }) }
})
</script>