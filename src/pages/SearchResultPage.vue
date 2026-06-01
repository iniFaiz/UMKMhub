<script setup>
import { useRoute, useRouter } from 'vue-router'
import { umkmStore, getCategoryLightColor } from '../data/umkmData'
import CategoryIcon from '../components/CategoryIcon.vue'
import { computed, ref } from 'vue'

const route = useRoute()
const router = useRouter()

const query = computed(() => route.query.q || '')
const searchInput = ref('')
const selectedCategory = ref('Semua')
const sortBy = ref('nama-az')

const categories = computed(() => ['Semua', ...umkmStore.getCategories()])

const baseResults = computed(() =>
  query.value ? umkmStore.search(query.value) : umkmStore.getAll()
)

const filteredResults = computed(() => {
  let items = baseResults.value
  if (selectedCategory.value !== 'Semua') {
    items = items.filter(u => u.kategori === selectedCategory.value)
  }
  return items
})

const results = computed(() => {
  const items = [...filteredResults.value]
  switch (sortBy.value) {
    case 'nama-za':
      return items.sort((a, b) => b.namaUsaha.localeCompare(a.namaUsaha))
    case 'kategori':
      return items.sort((a, b) => a.kategori.localeCompare(b.kategori))
    case 'nama-az':
    default:
      return items.sort((a, b) => a.namaUsaha.localeCompare(b.namaUsaha))
  }
})

function handleSearch() {
  const q = searchInput.value.trim()
  router.push({ name: 'SearchResult', query: q ? { q } : {} })
  searchInput.value = ''
}

function goToDetail(id) {
  router.push({ name: 'UmkmDetail', params: { id } })
}

function goHome() {
  router.push({ name: 'Home' })
}

function showAllUmkm() {
  selectedCategory.value = 'Semua'
  router.push({ name: 'SearchResult' })
}

function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trimEnd() + '...'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#FAE7CB]/30 via-white to-[#59B292]/5 pt-16 lg:pt-20">
    <header class="bg-white/80 backdrop-blur-md border-b border-[#59B292]/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div class="flex items-start sm:items-center gap-3 mb-4">
          <button
            @click="goHome"
            class="shrink-0 mt-1 sm:mt-0 w-9 h-9 flex items-center justify-center rounded-xl bg-[#59B292]/10 text-[#59B292] hover:bg-[#59B292] hover:text-white transition-all duration-200"
            aria-label="Kembali ke beranda"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="min-w-0">
            <h1 v-if="query" class="text-lg sm:text-xl font-bold text-gray-800 truncate">
              Hasil pencarian untuk "<span class="text-[#59B292]">{{ query }}</span>"
            </h1>
            <h1 v-else class="text-lg sm:text-xl font-bold text-gray-800">
              Semua UMKM
            </h1>
            <p class="text-sm text-gray-500 mt-0.5">
              <span class="font-semibold text-[#59B292]">{{ results.length }}</span> UMKM ditemukan
            </p>
          </div>
        </div>

        <form @submit.prevent="handleSearch" class="mb-4">
          <div class="relative flex items-center">
            <svg class="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
            <input
              v-model="searchInput"
              type="text"
              :placeholder="query ? 'Cari lagi...' : 'Cari UMKM...'"
              class="w-full pl-10 pr-24 py-2.5 rounded-xl border border-gray-200 bg-gray-50/80 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59B292]/40 focus:border-[#59B292] transition-all duration-200"
            />
            <button
              type="submit"
              class="absolute right-1.5 px-4 py-1.5 rounded-lg bg-[#59B292] text-white text-sm font-medium hover:bg-[#4a9e80] active:scale-95 transition-all duration-150"
            >
              Cari
            </button>
          </div>
        </form>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectedCategory = cat"
              :class="[
                'shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                selectedCategory === cat
                  ? 'bg-[#59B292] text-white shadow-md shadow-[#59B292]/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#59B292]/40 hover:text-[#59B292]'
              ]"
            >
              <CategoryIcon :name="cat" class="w-3.5 h-3.5" />
              {{ cat }}
            </button>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <label class="text-xs text-gray-500 font-medium whitespace-nowrap">Urutkan:</label>
            <select
              v-model="sortBy"
              class="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#59B292]/30 focus:border-[#59B292] transition-all duration-200 cursor-pointer"
            >
              <option value="nama-az">Nama A-Z</option>
              <option value="nama-za">Nama Z-A</option>
              <option value="kategori">Kategori</option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div
        v-if="results.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        <article
          v-for="umkm in results"
          :key="umkm.id"
          class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#59B292]/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          @click="goToDetail(umkm.id)"
        >
          <div class="relative h-44 sm:h-48 overflow-hidden">
            <img
              :src="umkm.foto.utama"
              :alt="umkm.namaUsaha"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <span
              :class="[
                'absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm',
                getCategoryLightColor(umkm.kategori)
              ]"
            >
              <CategoryIcon :name="umkm.kategori" class="w-3.5 h-3.5" />
              {{ umkm.kategori }}
            </span>
          </div>

          <div class="p-4 sm:p-5">
            <h3 class="font-bold text-gray-800 text-base leading-snug mb-1 group-hover:text-[#59B292] transition-colors duration-200 line-clamp-1">
              {{ umkm.namaUsaha }}
            </h3>

            <div class="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
              </svg>
              <span class="truncate">{{ umkm.namaPemilik }}</span>
            </div>

            <p class="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
              {{ truncate(umkm.deskripsi) }}
            </p>

            <button
              @click.stop="goToDetail(umkm.id)"
              class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#59B292]/10 text-[#59B292] text-sm font-semibold hover:bg-[#59B292] hover:text-white active:scale-[0.98] transition-all duration-200"
            >
              Lihat Detail
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-16 sm:py-24 text-center"
      >
        <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FAE7CB]/60 flex items-center justify-center mb-6">
          <svg class="w-16 h-16 sm:w-20 sm:h-20 text-[#FA6781]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" />
            <path stroke-linecap="round" d="M8 9.5V9m8 .5V9" />
            <path stroke-linecap="round" d="M8 16c1-1.333 2.667-2 4-2s3 .667 4 2" />
          </svg>
        </div>

        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Tidak ada UMKM yang ditemukan
        </h2>
        <p class="text-gray-500 text-sm sm:text-base max-w-md mb-2">
          Kami tidak menemukan UMKM yang cocok dengan pencarian
          <span v-if="query" class="font-semibold text-[#FA6781]">"{{ query }}"</span>.
        </p>
        <p class="text-gray-400 text-sm mb-8">
          Coba gunakan kata kunci lain atau jelajahi kategori yang tersedia.
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-3">
          <button
            @click="goHome"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#59B292] text-white font-semibold text-sm hover:bg-[#4a9e80] active:scale-95 shadow-lg shadow-[#59B292]/25 transition-all duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v10h14V10" />
            </svg>
            Kembali ke Beranda
          </button>
          <button
            @click="showAllUmkm"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-[#59B292] font-semibold text-sm border-2 border-[#59B292]/30 hover:border-[#59B292] hover:bg-[#59B292]/5 active:scale-95 transition-all duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Lihat Semua UMKM
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
