<template>
  <div class="pb-16">
    <!-- Główna karta z mapą -->
    <div class="bg-tertiaryGreen/50 rounded-[10px] p-5 w-full shadow-md shadow-black/20">
      
      <!-- Suwak zasięgu -->
      <div class="controls mb-6">
        <label for="distance" class="text-secondaryGold mb-2 block text-sm font-semibold">
          Zasięg mapy: {{ displayDistance }}
        </label>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          id="distance"
          v-model="distanceInMeters"
          ref="rangeInput"
          class="w-full h-2 rounded-lg appearance-none cursor-pointer custom-range-slider"
        />
      </div>

      <!-- Komunikaty o błędzie -->
      <div v-if="!currentUserPosition && geolocationError" class="map-placeholder error">
        <p>Nie udało się pobrać lokalizacji. Sprawdź uprawnienia w przeglądarce.</p>
      </div>
      <div v-else-if="!currentUserPosition || !user" class="map-placeholder">
        <p>Pobieranie Twojej lokalizacji i danych...</p>
      </div>

      <!-- MAPA -->
      <div 
        v-else 
        class="relative w-full h-[500px] overflow-hidden rounded-xl shadow-md z-0 map-wrapper"
      >
        <l-map 
          ref="map" 
          v-model:zoom="zoom" 
          :center="currentUserPosition" 
          :use-global-leaflet="false"
          class="w-full h-full z-0"
        >
          <l-tile-layer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            layer-type="base"
            name="Esri World Imagery"
            :attribution="'&copy; Esri'"
          />
          <l-tile-layer
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            layer-type="overlay"
            name="Labels"
            :attribution="'&copy; CartoDB'"
            pane="overlayPane"
          />

          <l-marker 
            v-if="currentUserPosition && user" 
            :lat-lng="currentUserPosition" 
            :icon="createCustomIcon(user.firstName)"
          >
            <l-tooltip :options="{ className: 'custom-tooltip' }">{{ user.name }} (Ty)</l-tooltip>
          </l-marker>

          <l-marker 
            v-for="otherUser in filteredUsers" 
            :key="otherUser.userId" 
            :lat-lng="[otherUser.lat, otherUser.lng]"
            :icon="createCustomIcon(otherUser.name)"
          >
            <l-tooltip :options="{ className: 'custom-tooltip' }">
              <strong>{{ otherUser.firstName }} {{ otherUser.lastName }}</strong>, {{ otherUser.age }}
            </l-tooltip>
          </l-marker>
        </l-map>
      </div>
    </div>

    <!-- Lista użytkowników -->
    <div class="user-list mt-8 bg-tertiaryGreen/50 rounded-[10px] p-5 shadow-md shadow-black/20">
      <h4 class="text-white text-[24px] tracking-[-0.6px] font-semibold mb-3">
        Użytkownicy w promieniu {{ displayDistance }}
      </h4>
      <ul v-if="currentUserPosition && filteredUsers.length" class="space-y-2 text-secondaryGold">
        <li 
          v-for="user in filteredUsers" 
          :key="user.userId" 
          class="flex justify-between p-3 bg-tertiaryGreen/30 rounded-[8px] hover:bg-tertiaryGreen/50 transition"
        >
          <span class="text-white font-medium">{{ user.firstName }} {{ user.lastName }}</span>
          <span class="text-secondaryGold text-sm font-light">
            {{ calculateDistance(currentUserPosition.lat, currentUserPosition.lng, user.lat, user.lng).toFixed(2) }} km
          </span>
        </li>
      </ul>
      <p v-else-if="currentUserPosition" class="text-secondaryGold/70">
        Brak aktywnych użytkowników w promieniu {{ displayDistance }}.
      </p>
      <p v-else class="text-secondaryGold/70">Oczekuję na lokalizację...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted, watchEffect } from 'vue';
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import L from 'leaflet';
import apiClient from '@/api/api.js';
import { statuses } from '../../../shared/statuses.js';

const zoom = ref(13);
const distanceInMeters = ref(5000);
const onlineUsers = ref([]);
const currentUserPosition = ref(null);
const geolocationError = ref(false);
const rangeInput = ref(null);

const user = ref(null);
const status = ref('');
const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");

function updateRangeProgress(value) {
  const min = 100;
  const max = 10000;
  const progress = (value - min) / (max - min);
  if (rangeInput.value) {
    rangeInput.value.style.setProperty('--range-progress', progress);
  }
}

const displayDistance = computed(() => {
  if (distanceInMeters.value < 1000) return `${distanceInMeters.value} m`;
  return `${(distanceInMeters.value / 1000).toFixed(1)} km`;
});

watch(distanceInMeters, (newDistance) => {
  updateRangeProgress(newDistance);
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

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function createCustomIcon(name = '') {
  const letter = name ? name.charAt(0).toUpperCase() : '?';
  return L.divIcon({
    html: `<span>${letter}</span>`,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

const fetchUserData = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const res = await apiClient.get('/users/me', { 
      headers: { Authorization: `Bearer ${token}` }
    });
    const userData = res.data;
    status.value = userData.status;
    user.value = {
      name: `${userData.firstName} ${userData.lastName}`,
      _id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      age: userData.age,
    };
  } catch (err) {
    console.error('Błąd pobierania danych użytkownika:', err);
    user.value = { name: 'Błąd', _id: 'error' };
  }
};

const latLng = ref([0, 0]);
socket.on("connect", () => {
  latLng.value = [...latLng.value];
});

watchEffect(() => {
  const [latitude, longitude] = latLng.value;
  if ("_id" in (user.value ?? {})) {
    socket.emit('updateLocation', {
      userId: user.value._id,
      lat: latitude,
      lng: longitude,
      name: user.value.firstName.charAt(0).toUpperCase(),
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      age: user.value.age,
      status: status.value,
    });
  }
});

onMounted(async () => {
  await fetchUserData();
  updateRangeProgress(distanceInMeters.value);

  socket.on('updateUserList', (users) => {
    if (user.value) {
      onlineUsers.value = users.filter(u => u.userId !== user.value._id);
    }
  });

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords;
      currentUserPosition.value = { lat: latitude, lng: longitude };
      geolocationError.value = false;

      if (user.value && user.value._id) {
        latLng.value = [latitude, longitude];
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
/* Ikony markerów */
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

/* Tooltipy */
.custom-tooltip {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  color: white;
  padding: 6px 10px;
  font-size: 14px;
  white-space: nowrap;
}

/* Suwak */
.custom-range-slider {
  --range-fill-color: #1C3A27;
  --range-empty-color: #D35226;
  background: none;
  height: 8px;
}

.custom-range-slider::-webkit-slider-runnable-track {
  background: linear-gradient(to right,
    var(--range-fill-color) calc(var(--range-progress) * 100%),
    var(--range-empty-color) calc(var(--range-progress) * 100%));
  height: 8px;
  border-radius: 4px;
}

.custom-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 20px;
  margin-top: -6px;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIyIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTEuMDUxOCAwLjVDMTYuNDUxOSAwLjUwMDIyNCAyMC44MDc2IDQuNzY1MjkgMjAuODA3NiAxMEMyMC44MDc2IDE1LjIzNDcgMTYuNDUxOSAxOS40OTk4IDExLjA1MTggMTkuNUM1LjY1MTQzIDE5LjUgMS4yOTQ5MiAxNS4yMzQ4IDEuMjk0OTIgMTBDMS4yOTQ5MiA0Ljc2NTE1IDUuNjUxNDMgMC41IDExLjA1MTggMC41WiIgZmlsbD0iIzBFMEUwRSIgc3Ryb2tlPSIjMUMzQTI3Ii8+PC9zdmc+") center / contain no-repeat;
  border: none;
  cursor: grab;
}

/* --- MAPA --- */
.map-wrapper {
  position: relative;
  z-index: 0;
}
.leaflet-container,
.leaflet-pane,
.leaflet-top,
.leaflet-bottom {
  z-index: 0 !important;
}

/* Navbar nad mapą */
.navbar, .nav-menu, .header {
  position: relative;
  z-index: 1000;
}

/* Responsywność */
@media (max-width: 768px) {
  .map-wrapper {
    height: 500px !important;
  }
}
</style>

<style scoped>
.map-placeholder {
  height: 500px;
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
