<template>
  <div class="min-h-screen bg-[#FFF9F0] flex items-center justify-center px-4 py-10">
    <section class="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl shadow-[#59B292]/10 p-6 sm:p-8">
      <router-link to="/" class="inline-flex items-center gap-2 text-sm font-semibold text-[#59B292] hover:text-[#478f76] mb-8">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Beranda
      </router-link>

      <div class="mb-8">
        <div class="w-12 h-12 rounded-xl bg-[#59B292]/10 text-[#59B292] flex items-center justify-center mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Zm10-10V7a4 4 0 0 0-8 0v4" />
          </svg>
        </div>
        <h1 class="text-2xl font-extrabold text-gray-900">Login Admin</h1>
        <p class="text-sm text-gray-500 mt-2">Masukkan email dan password untuk membuka panel admin.</p>
      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            id="email"
            v-model.trim="email"
            type="email"
            autocomplete="email"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59B292]/40 focus:border-[#59B292]"
            placeholder="admin@umkmkatalog.id"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59B292]/40 focus:border-[#59B292]"
            placeholder="Password"
          />
        </div>

        <p v-if="errorMessage" class="text-sm font-medium text-[#FA6781]">{{ errorMessage }}</p>

        <button
          type="submit"
          class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#59B292] text-white font-bold hover:bg-[#478f76] active:scale-[0.98] transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m12 0-4-4m4 4-4 4m5-13h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
          </svg>
          Masuk
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

function handleLogin() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Email dan password wajib diisi.'
    return
  }

  sessionStorage.setItem('umkm-admin-auth', 'true')
  sessionStorage.setItem('umkm-admin-email', email.value)
  router.replace(route.query.redirect || { name: 'Admin' })
}
</script>
