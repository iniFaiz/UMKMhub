import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import UmkmDetailPage from '../pages/UmkmDetailPage.vue'
import SearchResultPage from '../pages/SearchResultPage.vue'
import AdminPage from '../pages/AdminPage.vue'
import AdminLoginPage from '../pages/AdminLoginPage.vue'
import TermsPage from '../pages/TermsPage.vue'
import PrivacyPage from '../pages/PrivacyPage.vue'
import AchievementsPage from '../pages/AchievementsPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'
import { themeState, applyTheme } from '../stores/uiState'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/umkm/:id',
    name: 'UmkmDetail',
    component: UmkmDetailPage
  },
  {
    path: '/search',
    name: 'SearchResult',
    component: SearchResultPage
  },
  {
    path: '/syarat-ketentuan',
    name: 'Terms',
    component: TermsPage
  },
  {
    path: '/kebijakan-privasi',
    name: 'Privacy',
    component: PrivacyPage
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: AchievementsPage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { hideShell: true, requiresAdmin: true }
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLoginPage,
    meta: { hideShell: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  // Force light mode on admin pages, otherwise restore preferred theme
  if (to.path.startsWith('/admin')) {
    themeState.forceLightMode = true
    themeState.isDark = false
    document.documentElement.classList.remove('dark')
  } else {
    themeState.forceLightMode = false
    const storedTheme = localStorage.getItem('theme') || 'auto'
    applyTheme(themeState.theme || storedTheme)
  }

  if (to.meta.requiresAdmin && sessionStorage.getItem('umkm-admin-auth') !== 'true') {
    return { name: 'AdminLogin', query: { redirect: to.fullPath } }
  }

  if (to.name === 'AdminLogin' && sessionStorage.getItem('umkm-admin-auth') === 'true') {
    return { name: 'Admin' }
  }

  return true
})

export default router
