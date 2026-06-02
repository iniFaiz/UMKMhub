import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import UmkmDetailPage from '../pages/UmkmDetailPage.vue'
import SearchResultPage from '../pages/SearchResultPage.vue'
import AdminPage from '../pages/AdminPage.vue'
import AdminLoginPage from '../pages/AdminLoginPage.vue'
import TermsPage from '../pages/TermsPage.vue'

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
    redirect: '/'
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
  if (to.meta.requiresAdmin && sessionStorage.getItem('umkm-admin-auth') !== 'true') {
    return { name: 'AdminLogin', query: { redirect: to.fullPath } }
  }

  if (to.name === 'AdminLogin' && sessionStorage.getItem('umkm-admin-auth') === 'true') {
    return { name: 'Admin' }
  }

  return true
})

export default router
