<template>
  <div class="flex flex-col items-center">
    <img
      class="max-h-[140px] max-w-[140px] w-[140px] h-[140px]"
      src="../assets/LosieLogo.png"
      alt="Logo"
    />
    <p class="text-[30px] text-white font-semibold">{{ title }}</p>
    <p class="text-sm text-secondaryGold mt-2">{{ underTitle }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  underTitle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: 'Dołącz do nas',
  },
})
</script>
