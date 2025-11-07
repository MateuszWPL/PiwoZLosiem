<template>
  <div class="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
    <l-map
      v-model:zoom="zoom"
      :center="coords"
      class="w-full h-full"
      @click="onMapClick"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <l-marker :lat-lng="coords" />
    </l-map>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const props = defineProps({ modelValue: Object });
const emit = defineEmits(["update:modelValue"]);

const zoom = ref(13);
const coords = ref(props.modelValue || { lat: 52.2297, lng: 21.0122 });

watch(coords, (newVal) => emit("update:modelValue", newVal));

const onMapClick = (e) => {
  coords.value = e.latlng;
};
</script>
