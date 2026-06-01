<template>
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
  >
    <template v-if="name === 'Makanan'">
      <path d="M4 10h16" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <path d="M8 10V5" />
      <path d="M12 10V5" />
      <path d="M16 10V5" />
    </template>
    <template v-else-if="name === 'Minuman'">
      <path d="M5 8h12v6a5 5 0 0 1-10 0V8Z" />
      <path d="M17 10h1a3 3 0 0 1 0 6h-1" />
      <path d="M6 20h12" />
      <path d="M8 4v1" />
      <path d="M12 3v2" />
      <path d="M16 4v1" />
    </template>
    <template v-else-if="name === 'Fashion'">
      <path d="M8 4 4 7l3 4 1.5-1.5V20h7V9.5L17 11l3-4-4-3" />
      <path d="M10 4a2 2 0 0 0 4 0" />
    </template>
    <template v-else-if="name === 'Kerajinan'">
      <path d="M15 4 4 15l-1 5 5-1L19 8" />
      <path d="m14 5 5 5" />
      <path d="M20 4h.01" />
      <path d="M22 7h.01" />
      <path d="M17 2h.01" />
    </template>
    <template v-else-if="name === 'Jasa'">
      <path d="m14.7 6.3 3-3a4 4 0 0 1-5 5l-6.4 6.4a2.1 2.1 0 1 0 3 3l6.4-6.4a4 4 0 0 1 5-5l-3 3" />
      <path d="m5 19-2 2" />
    </template>
    <template v-else>
      <path d="M4 5h16v14H4z" />
      <path d="M4 10h16" />
      <path d="M9 5v14" />
      <path d="M15 5v14" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: 'Semua'
  }
})
</script>
