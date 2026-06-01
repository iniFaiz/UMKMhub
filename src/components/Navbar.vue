<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-primary/5' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 h-16 lg:h-20">
        <router-link to="/" class="flex items-center gap-2 group shrink-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
            <span class="text-white font-bold text-lg">U</span>
          </div>
          <div class="flex flex-col">
            <span class="text-lg font-bold tracking-tight text-gray-900">
              UMKM<span class="text-primary">Hub</span>
            </span>
            <span class="text-[10px] font-medium -mt-1 text-gray-400">
              E-Catalog Indonesia
            </span>
          </div>
        </router-link>

        <div class="hidden lg:flex flex-1 justify-center">
          <transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 -translate-y-4 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 -translate-y-4 scale-95"
          >
            <form
              v-if="showDockedSearch"
              @submit.prevent="handleDockedSearch"
              class="w-full max-w-xl"
            >
              <div class="relative flex items-center bg-white rounded-2xl border border-gray-100 shadow-lg shadow-primary/10">
                <svg class="absolute left-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <input
                  v-model="searchState.query"
                  type="text"
                  placeholder="Cari UMKM, produk, atau kategori..."
                  class="w-full pl-11 pr-24 py-3 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  class="absolute right-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark active:scale-[0.98] transition-all duration-200"
                >
                  Cari
                </button>
              </div>
            </form>
          </transition>
        </div>

        <div class="hidden md:flex items-center gap-1 ml-auto">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative group"
            :class="isActive(link.path)
              ? 'text-primary bg-primary/10'
              : 'text-gray-600 hover:text-primary hover:bg-primary/5'"
          >
            {{ link.name }}
            <span
              v-if="isActive(link.path)"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
            />
          </router-link>
        </div>

        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden ml-auto p-2 rounded-xl text-gray-700 hover:bg-white/30 transition-colors"
          aria-label="Buka menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl"
      >
        <div class="px-4 py-3 space-y-1">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            :class="isActive(link.path)
              ? 'text-primary bg-primary/10'
              : 'text-gray-600 hover:text-primary hover:bg-primary/5'"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { homeSearchState } from '../stores/uiState'

const route = useRoute()
const router = useRouter()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const searchState = homeSearchState

const navLinks = [
  { name: 'Beranda', path: '/' },
  { name: 'Katalog', path: '/search' }
]

const showDockedSearch = computed(() => route.name === 'Home' && searchState.docked)

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const handleDockedSearch = () => {
  const q = searchState.query.trim()
  router.push({ name: 'SearchResult', query: q ? { q } : {} })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
