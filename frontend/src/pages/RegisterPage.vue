<template>
  <div
    class="bg-gradient-to-b from-green-900/20 to-green-900/80 h-screen flex items-center justify-center"
  >
    <RegisterForm />
  </div>
</template>

<script setup>
import RegisterForm from '../components/RegisterForm.vue'
import Splide from '@splidejs/splide'

document.addEventListener('DOMContentLoaded', function () {
  new Splide('.splide').mount()
})
</script>
