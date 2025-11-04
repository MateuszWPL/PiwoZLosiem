<script setup>
import { RouterView } from 'vue-router'
import axios from '@/api/api.js'
import { onMounted } from 'vue';
import { useSocketStore } from '@/stores/socketStore.js';

const socketStore = useSocketStore();

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const userRes = await axios.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = userRes.data;

      socketStore.initializeSocket(token, userData);
    } catch (error) {
      console.error('Błąd podczas pobierania danych użytkownika:', error);
    }
  }
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
