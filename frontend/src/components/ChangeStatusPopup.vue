<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    @click.self="close"
  >
    <div
      class="relative w-full max-w-sm rounded-2xl bg-tertiaryGreen/90 text-white shadow-2xl backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center justify-between px-6 pt-6">
        <h2 class="text-xl font-bold">Wybierz status</h2>
        <button
          @click="close"
          class="text-secondaryGold transition hover:text-primaryOrange"
          aria-label="Zamknij"
        >
          
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
                />
        </svg>
        </button>
      </div>
      <p class="mt-1 mb-4 px-6 text-sm text-secondaryGold">
        Twój status będzie widoczny dla innych użytkowników.
      </p>

      <div class="space-y-3 px-4 md:px-6">
        <div
          v-for="status in statuses"
          :key="status.value"
          @click="selectedStatus = status.value"
          class="p-3 text-center font-medium rounded-lg cursor-pointer transition-colors border"
          :class="selectedStatus === status.value
            ? activeStyleMap[status.value] || activeStyleMap.default
            : inactiveStyleMap[status.value] || inactiveStyleMap.default"
        >
          {{ status.label }}
        </div>
      </div>

      <div class="flex flex-col-reverse sm:flex-row gap-3 p-4 md:px-6 md:pb-6 mt-3">
        <button
          @click="close"
          class="w-full rounded-lg border border-secondaryGold py-2 px-6 text-white transition hover:bg-secondaryGold/20"
        >
          Anuluj
        </button>
        <button
          @click="saveSelection"
          class="w-full rounded-lg bg-primaryOrange py-2 px-6 font-semibold text-white transition-all duration-300 shadow-lg shadow-primaryOrange/30 hover:shadow-primaryOrange/50"
        >
          Zapisz
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onUnmounted } from 'vue';

const props = defineProps({
  visible: Boolean,
  statuses: {
    type: Array,
    required: true,
  },
  currentStatus: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close', 'select']);

const selectedStatus = ref(props.currentStatus);

watch(
  () => props.currentStatus,
  (newVal) => {
    selectedStatus.value = newVal;
  }
);

const activeStyleMap = {
  available: 'bg-green-600/20 border-green-500 text-white',
  busy: 'bg-red-500/20 border-red-500 text-white',
  offline: 'bg-gray-600/20 border-gray-500 text-white',
  default: 'bg-gray-600/20 border-gray-500 text-white',
};

const inactiveStyleMap = {
  available: 'border-primaryGreen text-green-400 bg-transparent hover:bg-green-500/10 hover:border-green-500/30',
  busy: 'border-primaryGreen text-red-400 bg-transparent hover:bg-red-500/10 hover:border-red-500/30',
  offline: 'border-primaryGreen text-gray-400 bg-transparent hover:bg-gray-500/10 hover:border-gray-500/30',
  default: 'border-primaryGreen text-gray-400 bg-transparent hover:bg-gray-500/10 hover:border-gray-500/30',
};


function close() {
  emit('close');
}

function saveSelection() {
  if (selectedStatus.value) {
    emit('select', selectedStatus.value);
  }
  close(); 
}

let prevBodyOverflow = '';
let prevBodyPaddingRight = '';
function lockBodyScrollAndCompensate() {
  prevBodyOverflow = document.body.style.overflow;
  prevBodyPaddingRight = document.body.style.paddingRight;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
}
function restoreBodyScroll() {
  document.body.style.overflow = prevBodyOverflow || '';
  document.body.style.paddingRight = prevBodyPaddingRight || '';
}
watch(() => props.visible, (isVisible) => {
  if (isVisible) {
    lockBodyScrollAndCompensate();
  } else {
    restoreBodyScroll();
  }
});
onUnmounted(() => {
  restoreBodyScroll();
});
</script>