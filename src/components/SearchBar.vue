<template>
  <form @submit.prevent="onSubmit" class="flex gap-2 items-center w-full">
    <label for="search-input" class="sr-only">Cari kota atau negara</label>
    <div class="relative flex-1">
      <input
        id="search-input"
        v-model="model"
        type="text"
        autocomplete="off"
        :placeholder="placeholder"
        class="w-full px-4 py-3 rounded-2xl bg-white/80 text-slate-800 placeholder-slate-500
               focus:outline-none focus:ring-4 focus:ring-accent/40 focus:bg-white/90 shadow transition-all duration-200
               border border-transparent focus:border-accent"
        :disabled="loading"
        @focus="focused = true"
        @blur="focused = false"
      />
      <svg
        class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none transition-colors duration-200"
        :class="{ 'text-accent': focused }"
        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    </div>
    <button
      type="submit"
      :disabled="loading || !model.trim()"
      class="px-6 py-3 rounded-2xl bg-accent text-white font-semibold shadow hover:brightness-110 active:scale-95 transition-all duration-150 flex items-center gap-2
            focus:outline-none focus:ring-2 focus:ring-accent/60 disabled:opacity-60 disabled:cursor-not-allowed"
      aria-label="Cari"
    >
      <svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
      <svg v-else class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.3"/><path d="M12 2v4" stroke-linecap="round"/>
      </svg>
      <span class="hidden sm:inline">Cari</span>
    </button>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({
  modelValue: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Cari kota atau negara (misal: Jakarta, Tokyo)...' }
})
const emit = defineEmits(['update:modelValue', 'search'])
const model = ref(props.modelValue)
const focused = ref(false)
watchEffect(() => emit('update:modelValue', model.value))
const onSubmit = () => {
  if (!props.loading && model.value.trim()) emit('search', model.value.trim())
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
@media (max-width: 640px) {
  button span {
    display: none;
  }
}
</style>
