<template>
  <div class="discover-page-container">
    <!-- Twoje istniejące elementy, jak pole wyszukiwania i filtr -->
    <div class="header-controls">
      <h2>Odkrywaj</h2>
      <div class="search-bar">
        <input type="text" placeholder="Szukaj..." />
      </div>
    </div>

    <!-- Tutaj wstawiamy komponent mapy -->
    <DiscoverMap />

    <!-- Tutaj mogą być inne elementy, np. sekcja "W pobliżu" z Twojego zrzutu ekranu,
         chociaż ta logika jest już wewnątrz komponentu DiscoverMap -->
  </div>
</template>

<script setup>
// 1. Zaimportuj swój nowy komponent
import DiscoverMap from '@/components/DiscoverMap.vue'; // Upewnij się, że ścieżka jest poprawna!
</script>

<style scoped>
.discover-page-container {
  padding: 2rem;
  /* Dowolne style dla całego kontenera widoku */
}

.header-controls {
  margin-bottom: 2rem;
  /* Style dla nagłówka, wyszukiwarki etc. */
}
</style>
