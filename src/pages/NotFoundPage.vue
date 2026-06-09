<template>
  <div class="min-h-screen pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FAE7CB]/20 via-white to-[#59B292]/5 dark:from-[#13100a] dark:via-[#0c0e14] dark:to-[#07130f] flex items-center justify-center transition-colors duration-300">
    <div class="max-w-md w-full text-center">
      
      <!-- Premium Thematic 404 Illustration SVG -->
      <div class="w-72 h-72 mx-auto mb-8">
        <svg class="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Dotted path representing navigation route -->
          <path d="M20 160 C 50 160, 70 170, 100 160 C 130 150, 150 160, 180 160" stroke="currentColor" class="text-gray-200 dark:text-white/10" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round" />
          
          <!-- Background Floating Stars/Elements -->
          <!-- Star 1 (Yellow) -->
          <path d="M35 75 L37 80 L42 80 L38 83 L40 88 L35 85 L30 88 L32 83 L28 80 L33 80 Z" fill="#FFC94D" class="opacity-80" />
          <!-- Star 2 (Coral) -->
          <path d="M165 70 L167 74 L172 74 L168 77 L170 82 L165 79 L160 82 L162 77 L158 74 L163 74 Z" fill="#FA6781" class="opacity-80" />
          
          <!-- Floating circles -->
          <circle cx="150" cy="50" r="3" fill="#59B292" class="opacity-40" />
          <circle cx="45" cy="130" r="2" fill="#59B292" class="opacity-40" />
          <circle cx="170" cy="125" r="4" fill="#FFC94D" class="opacity-30" />

          <!-- Cute Shop Building (Representing UMKM) -->
          <!-- Signboard -->
          <rect x="65" y="65" width="30" height="13" rx="2.5" fill="currentColor" stroke="#FFC94D" stroke-width="1.5" class="text-white dark:text-[#161a24]" />
          <text x="80" y="74.5" text-anchor="middle" font-size="8" font-weight="900" fill="#e6b03a" font-family="sans-serif">?</text>
          
          <!-- Main shop building body -->
          <rect x="50" y="100" width="60" height="50" rx="8" fill="currentColor" stroke="#59B292" stroke-width="2" class="text-white dark:text-[#161a24]" />
          
          <!-- Shop Door -->
          <rect x="70" y="120" width="20" height="30" rx="3" fill="currentColor" stroke="currentColor" class="text-gray-50 dark:text-[#0d0f14] stroke-gray-200 dark:stroke-white/5" stroke-width="1.5" />
          <circle cx="85" cy="135" r="1.5" fill="#FFC94D" />
          
          <!-- Awning / Roof stripes -->
          <path d="M45 100 L115 100 L107 85 L53 85 Z" fill="#FA6781" stroke="#FA6781" stroke-width="1.5" stroke-linejoin="round" />
          <line x1="60" y1="85" x2="60" y2="100" stroke="white" stroke-width="1.5" class="opacity-50" />
          <line x1="73" y1="85" x2="73" y2="100" stroke="white" stroke-width="1.5" class="opacity-50" />
          <line x1="87" y1="85" x2="87" y2="100" stroke="white" stroke-width="1.5" class="opacity-50" />
          <line x1="100" y1="85" x2="100" y2="100" stroke="white" stroke-width="1.5" class="opacity-50" />
          
          <!-- Magnifying Glass overlaying the shop -->
          <!-- Handle outer shadow/frame -->
          <line x1="140" y1="125" x2="172" y2="157" stroke="#478f76" stroke-width="7.5" stroke-linecap="round" />
          <!-- Handle inner highlight -->
          <line x1="140" y1="125" x2="172" y2="157" stroke="#FFC94D" stroke-width="3" stroke-linecap="round" />
          
          <!-- Magnifying Glass Lens Frame -->
          <circle cx="120" cy="105" r="32" fill="currentColor" stroke="#59B292" stroke-width="4.5" class="text-[#FFF9F0] dark:text-[#161a24]" />
          
          <!-- Glass reflection light ring -->
          <path d="M96 93 A26 26 0 0 1 144 93" fill="none" stroke="white" stroke-width="2.5" class="opacity-40" stroke-linecap="round" />
          
          <!-- Huge 404 Text inside Lens -->
          <text x="120" y="113.5" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="900" font-size="24" fill="currentColor" class="text-gray-900 dark:text-white" letter-spacing="-1">404</text>
        </svg>
      </div>

      <!-- Heading & Text -->
      <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Halaman Tidak Ditemukan</h2>
      <p class="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
        Waduh, sepertinya Anda tersesat di luar wilayah pemetaan UMKM kami. Halaman yang Anda cari mungkin telah dipindahkan atau dihapus.
      </p>

      <!-- Return Button -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#59B292] to-[#478f76] text-white font-bold hover:shadow-lg hover:shadow-[#59B292]/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
        </svg>
        Kembali ke Beranda
      </router-link>

    </div>
  </div>
</template>

<script setup>
// Minimal script logic for standard NotFoundPage view
</script>

<style scoped>
/* Clean scoped styling */
</style>
