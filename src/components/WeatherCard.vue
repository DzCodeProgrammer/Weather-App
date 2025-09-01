<template>
  <div
    class="bg-gradient-to-br from-white/40 via-blue-200/30 to-blue-400/20 backdrop-blur-2xl shadow-glass rounded-3xl p-6 sm:p-10 w-full mx-auto
           hover:shadow-2xl transition-transform duration-300 will-change-transform scale-100 hover:scale-105 border border-white/30 relative overflow-hidden"
  >
    <!-- Decorative gradient circle -->
    <div class="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm flex items-center gap-2">
          <span class="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          {{ weather.name }}, {{ weather.sys.country }}
        </h2>
        <p class="text-white/80 capitalize flex items-center gap-1 mt-1">
          <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="5"/></svg>
          {{ weather.weather[0].description }}
        </p>
        <p class="text-white/70 flex items-center gap-1 mt-1">
          <svg class="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          <span>Jam lokal: <span class="font-semibold">{{ localTime }}</span></span>
        </p>
      </div>
      <img
        class="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg float animate-float"
        :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
        :alt="weather.weather[0].main"
      />
    </div>

    <div class="text-center">
      <div class="text-7xl sm:text-8xl font-extrabold text-yellow-300 drop-shadow animate-temperature flex items-center justify-center gap-2">
        {{ Math.round(weather.main.temp) }}
        <span class="text-3xl font-bold text-white/80">
          °{{ units === 'imperial' ? 'F' : 'C' }}
        </span>
      </div>
      <div class="mt-2 text-white/90 text-lg">
        Feels like <span class="font-semibold">{{ Math.round(weather.main.feels_like) }}°{{ units === 'imperial' ? 'F' : 'C' }}</span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3 sm:gap-5 text-center mt-8">
      <div class="bg-white/40 rounded-2xl p-4 flex flex-col items-center shadow transition hover:scale-105">
        <svg class="w-7 h-7 mb-1 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1011.314-11.314l-4.243 4.243a4 4 0 00-5.657 5.657z"/></svg>
        <div class="text-xs text-white/80 uppercase tracking-wide">Angin</div>
        <div class="text-white font-semibold text-lg">{{ weather.wind.speed }} <span class="text-xs">m/s</span></div>
      </div>
      <div class="bg-white/40 rounded-2xl p-4 flex flex-col items-center shadow transition hover:scale-105">
        <svg class="w-7 h-7 mb-1 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/><path d="M12 6v6l4 2"/></svg>
        <div class="text-xs text-white/80 uppercase tracking-wide">Kelembapan</div>
        <div class="text-white font-semibold text-lg">{{ weather.main.humidity }}<span class="text-xs">%</span></div>
      </div>
      <div class="bg-white/40 rounded-2xl p-4 flex flex-col items-center shadow transition hover:scale-105">
        <svg class="w-7 h-7 mb-1 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        <div class="text-xs text-white/80 uppercase tracking-wide">Tekanan</div>
        <div class="text-white font-semibold text-lg">{{ weather.main.pressure }} <span class="text-xs">hPa</span></div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between mt-8 text-white/80 text-xs gap-2">
      <div class="flex items-center gap-1">
        <svg class="w-4 h-4 text-yellow-200" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 12a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm8-4a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zm-12 0a1 1 0 01-1 1H3a1 1 0 110-2h2a1 1 0 011 1zm9.071-5.071a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm-9.9 9.9a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm12.728 0a1 1 0 00-1.414 0l-1.414 1.414a1 1 0 101.414 1.414l1.414-1.414a1 1 0 000-1.414zm-9.9-9.9a1 1 0 00-1.414 0L3.343 5.343a1 1 0 101.414 1.414l1.414-1.414a1 1 0 000-1.414z"/></svg>
        Sunrise: <span class="font-semibold">{{ new Date(weather.sys.sunrise * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }}</span>
      </div>
      <div class="flex items-center gap-1">
        <svg class="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293a8 8 0 11-11.314 0 1 1 0 011.414-1.414 6 6 0 108.486 0 1 1 0 011.414 1.414z"/></svg>
        Sunset: <span class="font-semibold">{{ new Date(weather.sys.sunset * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
const props = defineProps({
  weather: { type: Object, required: true },
  units: { type: String, default: 'metric' }
})

const localTime = ref('')
let timer = null

function updateLocalTime() {
  if (!props.weather || !props.weather.timezone) return
  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const local = new Date(utc + (props.weather.timezone * 1000))
  localTime.value = local.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

onMounted(() => {
  updateLocalTime()
  timer = setInterval(updateLocalTime, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
watch(() => props.weather, () => {
  updateLocalTime()
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-10px);}
}
.animate-float { animation: float 3s ease-in-out infinite; }

@keyframes temperature {
  0%, 100% { color: #fde68a; }
  50% { color: #f59e0b; }
}
.animate-temperature { animation: temperature 2s infinite; }
</style>
