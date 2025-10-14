<template>
  <div class="discover-container">
    <div class="controls">
      <label for="distance">Odległość: {{ displayDistance }}</label>
      <input
        type="range"
        min="100"
        max="10000"
        step="100"
        id="distance"
        v-model="distanceInMeters"
        class="slider"
      />
    </div>

    <div v-if="!currentUserPosition && geolocationError" class="map-placeholder error">
      <p>Nie udało się pobrać lokalizacji. Sprawdź uprawnienia w przeglądarce.</p>
    </div>
    <div v-else-if="!currentUserPosition || !user" class="map-placeholder">
      <p>Pobieranie Twojej lokalizacji i danych...</p>
    </div>

    <div v-else style="height:700px; width:100%">
      <l-map ref="map" v-model:zoom="zoom" :center="currentUserPosition" :use-global-leaflet="false">
        <l-tile-layer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          layer-type="base"
          name="Esri World Imagery"
          :attribution="'&copy; Esri'"
        ></l-tile-layer>
        <l-tile-layer
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
          layer-type="overlay"
          name="Labels"
          :attribution="'&copy; CartoDB'"
          pane="overlayPane"
        ></l-tile-layer>

        <l-marker v-if="currentUserPosition && user" :lat-lng="currentUserPosition" :icon="createCustomIcon(user.name)">
            <l-tooltip :options="{ className: 'custom-tooltip' }">{{ user.name }}</l-tooltip>
        </l-marker>

        <l-marker 
            v-for="otherUser in filteredUsers" 
            :key="otherUser.id" 
            :lat-lng="[otherUser.lat, otherUser.lng]"
            :icon="createCustomIcon(otherUser.name)">
          <l-tooltip :options="{ className: 'custom-tooltip' }">{{ otherUser.name }}</l-tooltip>
        </l-marker>
      </l-map>
    </div>

    <div class="user-list">
      <h3>W pobliżu</h3>
      <ul v-if="currentUserPosition">
        <li v-for="user in filteredUsers" :key="user.id">
          {{ user.name }} - {{ calculateDistance(currentUserPosition.lat, currentUserPosition.lng, user.lat, user.lng).toFixed(2) }} km
        </li>
      </ul>
      <p v-else>Oczekuję na lokalizację, aby wyświetlić użytkowników...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import L from 'leaflet';
import axios from 'axios';

const zoom = ref(13);
const distanceInMeters = ref(5000);
const onlineUsers = ref([]);
const currentUserPosition = ref(null);
const geolocationError = ref(false);
const user = ref(null);

const socket = io("http://localhost:5000");

const displayDistance = computed(() => {
  if (distanceInMeters.value < 1000) {
    return `${distanceInMeters.value} m`;
  }
  return `${(distanceInMeters.value / 1000).toFixed(1)} km`;
});

watch(distanceInMeters, (newDistance) => {
  if (newDistance <= 500) zoom.value = 16;
  else if (newDistance <= 1000) zoom.value = 15;
  else if (newDistance <= 2000) zoom.value = 14;
  else if (newDistance <= 5000) zoom.value = 13;
  else if (newDistance <= 8000) zoom.value = 12;
  else zoom.value = 11;
});

const filteredUsers = computed(() => {
  if (!currentUserPosition.value) return [];
  
  const distanceInKm = distanceInMeters.value / 1000;

  return onlineUsers.value.filter(u => {
    const dist = calculateDistance(
      currentUserPosition.value.lat,
      currentUserPosition.value.lng,
      u.lat,
      u.lng
    );
    return dist <= distanceInKm;
  });
});

function createCustomIcon(name = '') {
  const letter = name ? name.charAt(0).toUpperCase() : '?';
  return L.divIcon({
    html: `<span>${letter}</span>`,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

async function fetchCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("Brak tokenu, nie można pobrać danych użytkownika.");
    user.value = { name: 'Gość' };
    return;
  }
  try {
    const response = await axios.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Pobrane dane zalogowanego użytkownika:", response.data); 
    user.value = response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych użytkownika:", error);
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

onMounted(async () => {
  await fetchCurrentUser();

  socket.on('updateUserList', (users) => {
    console.log("Otrzymano listę użytkowników z serwera:", users);
    onlineUsers.value = users.filter(u => u.id !== socket.id);
  });

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords;
      currentUserPosition.value = { lat: latitude, lng: longitude };
      geolocationError.value = false;
      
      if (user.value && user.value.name) {
        socket.emit('updateLocation', {
          lat: latitude,
          lng: longitude,
          name: user.value.name
        });
      }
    }, 
    (error) => {
      console.error("Błąd geolokalizacji:", error);
      geolocationError.value = true;
    },
    { enableHighAccuracy: true });
  } else {
    geolocationError.value = true;
  }
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<style>
.custom-marker-icon {
  background-color: #f97316;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-marker-icon span {
  color: white;
  font-size: 16px;
  font-weight: bold;
  font-family: sans-serif;
}

.custom-tooltip {
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 4px;
  color: white;
  padding: 6px 10px;
  font-size: 14px;
  box-shadow: none;
  white-space: nowrap;
}

.leaflet-tooltip-top.custom-tooltip::before,
.leaflet-tooltip-bottom.custom-tooltip::before {
  border-top-color: rgba(0, 0, 0, 0.8);
  border-bottom-color: rgba(0, 0, 0, 0.8);
}
</style>

<style scoped>
.map-placeholder {
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333; 
  border-radius: 8px;
  color: #ccc;
}
.map-placeholder.error {
  background-color: #442222;
  color: #ff8888;
}
</style>

