<template>
  <form @submit.prevent="$emit('search', model)" class="flex gap-2">
    <div class="relative flex-1">
      <input
        v-model="model"
        type="text"
        placeholder="Cari kota atau negara (misal: Jakarta, Tokyo)..."
        class="w-full px-4 py-3 rounded-2xl bg-white/80 text-slate-800 placeholder-slate-500
               focus:outline-none focus:ring-2 focus:ring-accent/60 shadow transition"
      />
      <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
    </div>
    <button
      type="submit"
      class="px-5 py-3 rounded-2xl bg-accent text-white font-semibold shadow hover:brightness-110 active:scale-95 transition flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      Cari
    </button>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue', 'search'])
const model = ref(props.modelValue)
watchEffect(() => emit('update:modelValue', model.value))
</script>
