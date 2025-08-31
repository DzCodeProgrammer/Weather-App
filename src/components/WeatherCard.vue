<template>
  <div
    class="bg-gradient-to-br from-white/30 via-blue-200/20 to-blue-400/10 backdrop-blur-2xl shadow-glass rounded-3xl p-6 sm:p-8 w-full mx-auto
           hover:shadow-2xl transition-transform duration-300 will-change-transform scale-100 hover:scale-105 border border-white/30">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-2xl font-bold text-white drop-shadow-sm flex items-center gap-2">
          <span class="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          {{ weather.name }}, {{ weather.sys.country }}
        </h2>
        <p class="text-white/80 capitalize flex items-center gap-1">
          <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="5"/></svg>
          {{ weather.weather[0].description }}
        </p>
      </div>
      <img
        class="w-20 h-20 drop-shadow-lg float animate-float"
        :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
        :alt="weather.weather[0].main"
      />
    </div>

    <div class="text-center">
      <div class="text-7xl font-extrabold text-yellow-300 drop-shadow animate-temperature">{{ Math.round(weather.main.temp) }}°C</div>
      <div class="mt-2 text-white/90">Feels like <span class="font-semibold">{{ Math.round(weather.main.feels_like) }}°C</span></div>
    </div>

    <div class="grid grid-cols-3 gap-3 sm:gap-4 text-center mt-6">
      <div class="bg-white/30 rounded-2xl p-4 flex flex-col items-center">
        <svg class="w-6 h-6 mb-1 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1011.314-11.314l-4.243 4.243a4 4 0 00-5.657 5.657z"/></svg>
        <div class="text-xs text-white/80 uppercase">Angin</div>
        <div class="text-white font-semibold">{{ weather.wind.speed }} m/s</div>
      </div>
      <div class="bg-white/30 rounded-2xl p-4 flex flex-col items-center">
        <svg class="w-6 h-6 mb-1 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/><path d="M12 6v6l4 2"/></svg>
        <div class="text-xs text-white/80 uppercase">Kelembapan</div>
        <div class="text-white font-semibold">{{ weather.main.humidity }}%</div>
      </div>
      <div class="bg-white/30 rounded-2xl p-4 flex flex-col items-center">
        <svg class="w-6 h-6 mb-1 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        <div class="text-xs text-white/80 uppercase">Tekanan</div>
        <div class="text-white font-semibold">{{ weather.main.pressure }} hPa</div>
      </div>
    </div>

    <div class="flex justify-between mt-6 text-white/80 text-xs">
      <div class="flex items-center gap-1">
        <svg class="w-4 h-4 text-yellow-200" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 12a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm8-4a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zm-12 0a1 1 0 01-1 1H3a1 1 0 110-2h2a1 1 0 011 1zm9.071-5.071a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm-9.9 9.9a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm12.728 0a1 1 0 00-1.414 0l-1.414 1.414a1 1 0 101.414 1.414l1.414-1.414a1 1 0 000-1.414zm-9.9-9.9a1 1 0 00-1.414 0L3.343 5.343a1 1 0 101.414 1.414l1.414-1.414a1 1 0 000-1.414z"/></svg>
        Sunrise: {{ new Date(weather.sys.sunrise * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }}
      </div>
      <div class="flex items-center gap-1">
        <svg class="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293a8 8 0 11-11.314 0 1 1 0 011.414-1.414 6 6 0 108.486 0 1 1 0 011.414 1.414z"/></svg>
        Sunset: {{ new Date(weather.sys.sunset * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ weather: { type: Object, required: true } })
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
