<template>
  <div class="p-6 text-center">
    <h2 class="text-2xl font-semibold text-white mb-4">Ustaw swoją lokalizację</h2>
    
    <div class="flex justify-center mb-4">
      <button 
        @click="locateMe"
        class="bg-secondaryGold text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-tertiaryGreen transition"
      >
        📍 Zlokalizuj mnie
      </button>
    </div>

    <MapPicker v-model:coords="coords" />

    <div class="mt-6">
      <label class="block text-white mb-2">Status:</label>
      <input 
        v-model="status"
        type="text"
        placeholder="np. Gotowy na nowe znajomości"
        class="w-full p-2 rounded bg-white/80 text-black"
      />
    </div>

    <button 
      @click="saveLocation"
      class="mt-6 bg-primaryGreen text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-tertiaryGreen transition"
    >
      💾 Zapisz lokalizację
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MapPicker from "@/components/MapPicker.vue";
import apiClient from "@/api/api.js";

const router = useRouter();
const coords = ref({ lat: 52.2297, lng: 21.0122 });
const status = ref("");

const locateMe = () => {
  if (!navigator.geolocation) {
    alert("Twoja przeglądarka nie obsługuje geolokalizacji.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      coords.value = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    },
    () => alert("Nie udało się pobrać lokalizacji."),
    { enableHighAccuracy: true }
  );
};

const saveLocation = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Brak tokena, zaloguj się ponownie.");
    return;
  }
  try {
    await apiClient.post("/users/location", {
      lat: coords.value.lat,
      lng: coords.value.lng,
      status: status.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Lokalizacja zapisana!");
    router.push("/odkrywaj");
  } catch (err) {
    console.error("Błąd zapisu lokalizacji:", err);
    alert("Nie udało się zapisać lokalizacji.");
  }
};
</script>
