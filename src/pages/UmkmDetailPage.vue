<template>
  <div v-if="!umkm" class="min-h-screen flex items-center justify-center bg-[#FAE7CB]/30 dark:bg-[#0c0e14] transition-colors duration-300">
    <div class="text-center px-6 py-16 animate-fade-in">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-white dark:bg-[#161a24] text-[#59B292] flex items-center justify-center shadow-sm border border-transparent dark:border-white/5">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">UMKM Tidak Ditemukan</h1>
      <p class="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Maaf, usaha yang Anda cari tidak tersedia atau sudah dihapus.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 bg-[#59B292] hover:bg-[#4a9e80] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10h14V10" />
        </svg>
        Kembali ke Beranda
      </router-link>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gray-50 dark:bg-[#0c0e14] transition-colors duration-300">
    <section class="relative h-[65vh] min-h-[420px] max-h-[600px] overflow-hidden">
      <img
        :src="umkm.foto.utama"
        :alt="umkm.namaUsaha"
        class="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[1200ms]"
        @load="heroLoaded = true"
        :class="heroLoaded ? 'scale-100' : 'scale-110'"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>

      <button
        @click="goBack"
        class="absolute top-24 left-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all duration-300 group"
      >
        <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="text-sm font-medium">Kembali</span>
      </button>

      <div class="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-10 lg:p-14">
        <div class="max-w-6xl mx-auto">
          <span :class="['inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-lg', getCategoryColor(umkm.kategori)]">
            <CategoryIcon :name="umkm.kategori" class="w-4 h-4" />
            {{ umkm.kategori }}
          </span>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
            {{ umkm.namaUsaha }}
          </h1>
          <p class="text-white/80 text-base md:text-lg max-w-3xl line-clamp-2">
            {{ umkm.deskripsi }}
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-3 space-y-6">
          <article class="info-card bg-white dark:bg-[#161a24] p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
              <span class="heading-icon w-8 h-8 flex items-center justify-center rounded-lg bg-[#59B292]/10">
                <svg class="w-4 h-4 text-[#59B292]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              Tentang Usaha
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ umkm.deskripsi }}</p>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FA6781]/10">
                <svg class="w-4 h-4 text-[#FA6781]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
                </svg>
              </span>
              Informasi Pemilik
            </h2>
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-[#59B292] to-[#FFC94D] flex items-center justify-center text-white text-xl font-bold shadow-md">
                {{ umkm.namaPemilik.charAt(0) }}
              </div>
              <div>
                <p class="font-semibold text-gray-800 dark:text-white text-lg">{{ umkm.namaPemilik }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Pemilik Usaha</p>
              </div>
            </div>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FFC94D]/15">
                <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
                </svg>
              </span>
              Kontak
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a :href="'tel:' + umkm.kontak.telepon" class="contact-card bg-[#f9fafb] dark:bg-[#0d0f14] hover:bg-primary/5 dark:hover:bg-primary/10 border border-transparent dark:border-white/5 transition-colors duration-300 cursor-pointer">
                <span class="contact-icon bg-[#59B292]/10 text-[#59B292]">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
                  </svg>
                </span>
                <span class="min-w-0">
                  <span class="contact-label text-gray-400 dark:text-gray-500 transition-colors duration-300">Telepon</span>
                  <span class="contact-value text-gray-800 dark:text-gray-100 transition-colors duration-300">{{ umkm.kontak.telepon }}</span>
                </span>
              </a>
              <a :href="'https://wa.me/' + umkm.kontak.whatsapp.replace(/[^0-9]/g, '')" target="_blank" class="contact-card bg-[#f9fafb] dark:bg-[#0d0f14] hover:bg-green-500/10 border border-transparent dark:border-white/5 transition-colors duration-300 cursor-pointer">
                <span class="contact-icon bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5l1.5-3A7 7 0 1 1 9 16Z" />
                  </svg>
                </span>
                <span class="min-w-0">
                  <span class="contact-label text-gray-400 dark:text-gray-500 transition-colors duration-300">WhatsApp</span>
                  <span class="contact-value text-gray-800 dark:text-gray-100 transition-colors duration-300">{{ umkm.kontak.whatsapp }}</span>
                </span>
              </a>
              <a :href="'https://instagram.com/' + umkm.kontak.instagram.replace('@', '')" target="_blank" class="contact-card bg-[#f9fafb] dark:bg-[#0d0f14] hover:bg-pink-500/10 border border-transparent dark:border-white/5 transition-colors duration-300 cursor-pointer">
                <span class="contact-icon bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </span>
                <span class="min-w-0">
                  <span class="contact-label text-gray-400 dark:text-gray-500 transition-colors duration-300">Instagram</span>
                  <span class="contact-value text-gray-800 dark:text-gray-100 transition-colors duration-300">{{ umkm.kontak.instagram }}</span>
                </span>
              </a>
              <a :href="'mailto:' + umkm.kontak.email" class="contact-card bg-[#f9fafb] dark:bg-[#0d0f14] hover:bg-blue-500/10 border border-transparent dark:border-white/5 transition-colors duration-300 cursor-pointer">
                <span class="contact-icon bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 6 8 6 8-6" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16v12H4z" />
                  </svg>
                </span>
                <span class="min-w-0">
                  <span class="contact-label text-gray-400 dark:text-gray-500 transition-colors duration-300">Email</span>
                  <span class="contact-value text-gray-800 dark:text-gray-100 transition-colors duration-300">{{ umkm.kontak.email }}</span>
                </span>
              </a>
            </div>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#59B292]/10">
                <svg class="w-4 h-4 text-[#59B292]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              Jam Operasional
            </h2>
            <div class="overflow-hidden rounded-xl border border-gray-100 dark:border-white/5">
              <table class="w-full">
                <tbody>
                  <tr
                    v-for="(jadwal, index) in umkm.jamOperasional"
                    :key="index"
                    class="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td class="px-4 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300">{{ jadwal.hari }}</td>
                    <td class="px-4 py-3.5 text-sm text-right">
                      <span
                        :class="jadwal.jam === 'Tutup'
                          ? 'text-[#FA6781] bg-[#FA6781]/10 px-3 py-1 rounded-full font-medium'
                          : 'text-[#59B292] bg-[#59B292]/10 px-3 py-1 rounded-full font-medium'"
                      >
                        {{ jadwal.jam }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FFC94D]/15">
                <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
                </svg>
              </span>
              Metode Pembayaran
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="metode in umkm.metodePembayaran"
                :key="metode"
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-[#FAE7CB]/50 dark:bg-[#FAE7CB]/10 text-gray-700 dark:text-gray-300 border border-[#FAE7CB] dark:border-white/5"
              >
                <svg class="w-3.5 h-3.5 text-[#59B292]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z" clip-rule="evenodd" />
                </svg>
                {{ metode }}
              </span>
            </div>
          </article>

          <article class="info-card bg-white dark:bg-[#161a24] border border-gray-100 dark:border-white/5 transition-all duration-300">
            <h2 class="section-heading text-gray-800 dark:text-white transition-colors duration-300">
              <span class="heading-icon bg-[#FA6781]/10">
                <svg class="w-4 h-4 text-[#FA6781]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5h.01" />
                </svg>
              </span>
              Alamat
            </h2>
            <div class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-[#FAE7CB]/30 dark:from-[#FAE7CB]/10 to-transparent">
              <svg class="w-5 h-5 text-[#FA6781] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9ZM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clip-rule="evenodd" />
              </svg>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ umkm.alamat }}</p>
            </div>
            <div v-if="mapEmbedUrl" class="mt-4 overflow-hidden rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-[#161a24]">
              <iframe
                :src="mapEmbedUrl"
                :title="`Lokasi ${umkm.namaUsaha}`"
                class="w-full h-72 border-0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen
              ></iframe>
            </div>
          </article>
        </div>

        <aside class="lg:col-span-2">
          <div class="lg:sticky lg:top-24">
            <div class="bg-white dark:bg-[#161a24] rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-white/5 transition-colors duration-300">
              <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <span class="heading-icon bg-[#FFC94D]/15">
                  <svg class="w-4 h-4 text-[#FFC94D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9Z" />
                  </svg>
                </span>
                Produk / Menu
                <span class="ml-auto text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-black/30 px-2.5 py-1 rounded-full">
                  {{ umkm.produk.length }} item
                </span>
              </h2>

              <div class="space-y-3">
                <div
                  v-for="(produk, index) in umkm.produk"
                  :key="index"
                  class="group p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-[#59B292]/30 hover:bg-[#59B292]/[0.03] dark:hover:bg-[#59B292]/10 transition-all duration-300 cursor-default bg-white dark:bg-[#0d0f14]"
                >
                  <div class="flex items-start justify-between gap-3 mb-1.5">
                    <h3 class="font-semibold text-gray-800 dark:text-white text-sm leading-snug group-hover:text-[#59B292] transition-colors">
                      {{ produk.nama }}
                    </h3>
                    <span class="shrink-0 text-sm font-bold text-[#59B292] bg-[#59B292]/10 dark:bg-[#59B292]/20 px-2.5 py-0.5 rounded-lg whitespace-nowrap">
                      Rp {{ formatPrice(produk.harga) }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{{ produk.deskripsi }}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-[#FA6781]/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-[#FA6781]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.6-4.6a2 2 0 0 1 2.8 0L16 16m-2-2 1.6-1.6a2 2 0 0 1 2.8 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
            </svg>
          </span>
          Galeri Foto
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8 ml-[52px]">Lihat suasana dan produk kami lebih dekat</p>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <div
            v-for="(foto, index) in allPhotos"
            :key="index"
            :class="[
              'relative overflow-hidden rounded-2xl cursor-pointer group',
              index === 0 ? 'col-span-2 row-span-2' : '',
              index === 3 ? 'col-span-2 md:col-span-1' : ''
            ]"
            @click="openLightbox(index)"
          >
            <div :class="index === 0 ? 'aspect-square' : 'aspect-[4/3]'" class="w-full">
              <img
                :src="foto.url"
                :alt="foto.label"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div class="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
            <span class="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {{ foto.label }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="recommendedUmkm.length" class="mt-16">
        <div class="flex items-center justify-between gap-4 mb-6">
          <div>
            <span class="inline-flex items-center gap-2 text-sm font-semibold text-[#59B292] bg-[#59B292]/10 rounded-full px-4 py-1.5 mb-3">
              <CategoryIcon :name="umkm.kategori" class="w-4 h-4" />
              Rekomendasi {{ umkm.kategori }}
            </span>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Tempat Serupa</h2>
          </div>
          <router-link
            :to="{ name: 'SearchResult', query: { q: umkm.kategori } }"
            class="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#59B292] hover:text-[#478f76] dark:text-[#59B292] dark:hover:text-[#478f76]"
          >
            Lihat kategori
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          <router-link
            v-for="item in recommendedUmkm"
            :key="item.id"
            :to="{ name: 'UmkmDetail', params: { id: item.id } }"
            class="group bg-white dark:bg-[#161a24] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-black/40 hover:shadow-xl hover:shadow-[#59B292]/10 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="h-32 sm:h-40 overflow-hidden">
              <img
                :src="item.foto.utama"
                :alt="item.namaUsaha"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div class="p-3 sm:p-4">
              <p :class="['inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2', getCategoryLightColor(item.kategori)]">
                <CategoryIcon :name="item.kategori" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span class="hidden sm:inline">{{ item.kategori }}</span>
              </p>
              <h3 class="font-bold text-gray-800 dark:text-white text-sm sm:text-base group-hover:text-[#59B292] transition-colors line-clamp-1">
                {{ item.namaUsaha }}
              </h3>
              <p class="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 line-clamp-1">{{ getCity(item.alamat) }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          @click.self="closeLightbox"
          @keydown.escape="closeLightbox"
          @keydown.left="prevPhoto"
          @keydown.right="nextPhoto"
          tabindex="0"
          ref="lightboxRef"
        >
          <button
            @click="closeLightbox"
            class="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Tutup galeri"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            @click="prevPhoto"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Foto sebelumnya"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="max-w-5xl max-h-[85vh] px-4">
            <img
              :src="allPhotos[currentPhotoIndex]?.url"
              :alt="allPhotos[currentPhotoIndex]?.label"
              class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <p class="text-center text-white/70 text-sm mt-3 font-medium">
              {{ allPhotos[currentPhotoIndex]?.label }}
              <span class="text-white/40 ml-2">{{ currentPhotoIndex + 1 }} / {{ allPhotos.length }}</span>
            </p>
          </div>

          <button
            @click="nextPhoto"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Foto berikutnya"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#59B292] text-white shadow-xl shadow-[#59B292]/25 flex items-center justify-center hover:bg-[#478f76] hover:-translate-y-1 active:scale-95 transition-all duration-300"
        aria-label="Kembali ke atas"
      >
        <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import CategoryIcon from '../components/CategoryIcon.vue'
import { umkmStore, getCategoryColor, getCategoryLightColor } from '../data/umkmData'

const route = useRoute()
const router = useRouter()

const umkm = computed(() => umkmStore.getById(route.params.id))
const heroLoaded = ref(false)
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)
const lightboxRef = ref(null)
const showScrollTop = ref(false)

const allPhotos = computed(() => {
  if (!umkm.value) return []

  const photos = []
  umkm.value.foto.tempat?.forEach((url, i) => {
    photos.push({ url, label: `Suasana Tempat ${i + 1}` })
  })
  umkm.value.foto.produk?.forEach((url, i) => {
    photos.push({ url, label: `Foto Produk ${i + 1}` })
  })
  if (umkm.value.foto.menu) {
    photos.push({ url: umkm.value.foto.menu, label: 'Menu' })
  }

  return photos
})

const recommendedUmkm = computed(() => {
  if (!umkm.value) return []
  return umkmStore
    .getByCategory(umkm.value.kategori)
    .filter(item => item.id !== umkm.value.id)
    .slice(0, 3)
})

const mapEmbedUrl = computed(() => {
  if (!umkm.value) return ''
  return normalizeMapEmbed(umkm.value.mapsEmbed || umkm.value.alamat)
})

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price)
}

function getCity(alamat) {
  const parts = alamat.split(',')
  return parts[parts.length - 1]?.trim() || alamat
}

function normalizeMapEmbed(value) {
  const input = (value || '').trim()
  if (!input) return ''

  const iframeSrc = input.match(/src=["']([^"']+)["']/i)?.[1]
  const raw = (iframeSrc || input).replace(/&amp;/g, '&')

  if (/^https:\/\/(www\.)?google\.[^/]+\/maps\/embed/i.test(raw) || /^https:\/\/maps\.google\.[^/]+\/maps/i.test(raw)) {
    return raw
  }

  const coords = raw.match(/(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/)
  if (coords) {
    return `https://www.google.com/maps?q=${coords[1]},${coords[2]}&output=embed`
  }

  try {
    const url = new URL(raw)
    if (url.hostname.includes('google.') || url.hostname === 'maps.app.goo.gl') {
      const query = url.searchParams.get('q') || url.searchParams.get('query')
      return `https://www.google.com/maps?q=${encodeURIComponent(query || raw)}&output=embed`
    }
  } catch {
    // Non-URL text is treated as an address/search query.
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(raw)}&output=embed`
}

function handleScroll() {
  showScrollTop.value = window.scrollY > 500
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goBack() {
  if (window.history.state && window.history.state.back) {
    router.back()
    return
  }

  router.push('/')
}

function openLightbox(index) {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    lightboxRef.value?.focus()
  })
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function nextPhoto() {
  if (!allPhotos.value.length) return
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % allPhotos.value.length
}

function prevPhoto() {
  if (!allPhotos.value.length) return
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + allPhotos.value.length) % allPhotos.value.length
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})

watch(() => route.params.id, () => {
  heroLoaded.value = false
  lightboxOpen.value = false
  document.body.style.overflow = ''
})
</script>

<style scoped>
.info-card {
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgb(15 23 42 / 0.04);
}

@media (min-width: 768px) {
  .info-card {
    padding: 2rem;
  }
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.heading-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
}

.contact-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-label,
.contact-value {
  display: block;
}

.contact-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
}

.contact-value {
  font-size: 0.875rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active img {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.lightbox-enter-from img {
  transform: scale(0.9);
}
</style>
