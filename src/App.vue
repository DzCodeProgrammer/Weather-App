<template>
  <main class="container mx-auto px-4 py-10 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-400 to-yellow-200">
    <div class="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/20">
      <header class="text-center mb-6">
        <h1 class="text-4xl font-extrabold text-white drop-shadow-md flex items-center justify-center gap-2">
          <svg class="w-8 h-8 text-yellow-300 animate-spin-slow" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-opacity="0.3"/><path d="M12 2v4" stroke-linecap="round"/><path d="M12 18v4" stroke-linecap="round"/><path d="M2 12h4" stroke-linecap="round"/><path d="M18 12h4" stroke-linecap="round"/></svg>
          Weather App
        </h1>
        <p class="text-white/80">Cek cuaca kota favoritmu secara real‑time</p>
      </header>

      <section class="mb-6">
        <SearchBar v-model="city" @search="onSearch" />
        <div class="mt-2 flex justify-between text-white/80 text-sm">
          <button @click="useGeolocation" class="underline hover:text-accent transition">📍 Gunakan lokasiku</button>
          <label class="inline-flex items-center gap-2">
            <span>Unit</span>
            <select v-model="units" @change="reloadIfWeather" class="px-2 py-1 rounded-lg text-slate-800 bg-white/80 focus:ring-accent/60">
              <option value="metric">°C</option>
              <option value="imperial">°F</option>
            </select>
          </label>
        </div>
      </section>

      <transition name="fade" mode="out-in">
        <div v-if="loading" key="loading" class="text-center text-white/90 py-8 animate-pulse">Memuat cuaca...</div>
        <div v-else-if="error" key="error" class="text-center text-red-100 bg-red-500/30 border border-red-300/50 rounded-xl p-3 animate-shake">
          {{ error }}
        </div>
        <WeatherCard v-else-if="weather" :weather="weather" key="weather" />
      </transition>

      <section class="mt-6" v-if="history.length">
        <h3 class="text-white/90 mb-2">Pencarian Terakhir:</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="h in history"
            :key="h"
            class="px-3 py-1.5 rounded-full bg-white/20 text-white/90 hover:bg-accent hover:text-white transition shadow"
            @click="onSearch(h)"
          >
            {{ h }}
          </button>
        </div>
      </section>

      <footer class="mt-10 text-center text-white/70 text-sm">
        © 2025 Weather App — Built with Vue 3 + Vite + Tailwind
      </footer>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import WeatherCard from './components/WeatherCard.vue'

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY || ''
const units = ref('metric')
const city = ref('')
const weather = ref(null)
const loading = ref(false)
const error = ref('')
const history = ref(JSON.parse(localStorage.getItem('wa-history') || '[]'))

const saveHistory = (name) => {
  const s = new Set([name, ...history.value])
  history.value = Array.from(s).slice(0, 8)
  localStorage.setItem('wa-history', JSON.stringify(history.value))
}

const onSearch = async (name) => {
  if (!name) return;
  error.value = ''
  loading.value = true
  try {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    url.searchParams.set('q', name)
    url.searchParams.set('appid', API_KEY)
    url.searchParams.set('units', units.value)
    url.searchParams.set('lang', 'id')

    const res = await fetch(url)
    if (!res.ok) throw new Error('Kota tidak ditemukan')
    weather.value = await res.json()
    city.value = weather.value.name
    saveHistory(city.value)
  } catch (e) {
    error.value = e.message || 'Gagal memuat data cuaca'
    weather.value = null
  } finally {
    loading.value = false
  }
}

const useGeolocation = () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocation tidak didukung browser ini.'
    return
  }
  navigator.geolocation.getCurrentPosition(async (pos) => {
    try {
      error.value = ''
      loading.value = true
      const { latitude, longitude } = pos.coords
      const url = new URL('https://api.openweathermap.org/data/2.5/weather')
      url.searchParams.set('lat', latitude)
      url.searchParams.set('lon', longitude)
      url.searchParams.set('appid', API_KEY)
      url.searchParams.set('units', units.value)
      url.searchParams.set('lang', 'id')
      const res = await fetch(url)
      if (!res.ok) throw new Error('Lokasi tidak ditemukan')
      weather.value = await res.json()
      city.value = weather.value.name || ''
      if (city.value) saveHistory(city.value)
    } catch (e) {
      error.value = e.message || 'Gagal mengambil lokasi'
      weather.value = null
    } finally {
      loading.value = false
    }
  }, () => {
    error.value = 'Izin lokasi ditolak.'
  }, { enableHighAccuracy: true, timeout: 10000 })
}

const reloadIfWeather = () => {
  if (city.value) onSearch(city.value)
}
</script>

<style scoped>
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }

@keyframes shake {
  0%, 100% { transform: translateX(0);}
  20%, 60% { transform: translateX(-8px);}
  40%, 80% { transform: translateX(8px);}
}
.animate-shake { animation: shake 0.5s; }

@keyframes spin-slow { 100% { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 4s linear infinite; }
</style>
