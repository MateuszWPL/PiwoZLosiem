<template>
  <div>
    <img class="h-screen w-full object-cove" src="/images/MainPage.png" alt="" />
    <div class="absolute inset-0">
      <div class="flex items-center justify-center h-full">
        <img
          src="../assets/LosieLogo.png"
          class="h-80 w-80 custom-image-zoom-in-animation scale-0"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


onMounted(() => {

  setTimeout(() => {

    router.push('/powitanie')
  }, 5000)
})
</script>

<style scoped>
.custom-image-zoom-in-animation {
  animation: zoom-in 2s 1s forwards;
}

@keyframes zoom-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
