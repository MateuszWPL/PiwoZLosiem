import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../pages/RegisterPage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Welcome from '@/pages/Welcome.vue'
import Ranking from '@/pages/Ranking.vue'
import LoginPage from '@/pages/LoginPage.vue'
import MainPage from '@/pages/MainPage.vue'
import ForgottenPasswordPage from '@/pages/ForgottenPasswordPage.vue'
import RegisterPageComplete from '@/pages/RegisterPage-Complete.vue'
import MyBeers from '@/pages/MyBeers.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import Chat from '@/pages/Chat.vue'
import ChatRoom from '@/pages/ChatRoom.vue'
import DiscoverView from '@/pages/DiscoverView.vue'
import ResetPassword from '@/pages/ResetPassword.vue'

const routes = [
  { path: '/', name: 'MainPage', component: MainPage, meta: { title: 'Strona Główna' } },
  { path: '/rejestracja', name: 'Rejestracja', component: RegisterPage, meta: { title: 'Rejestracja' } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true, title: 'Dashboard' } },
  { path: '/logowanie', name: 'Logowanie', component: LoginPage, meta: { requiresGuest: true, title: 'Logowanie' } },
  { path: '/resetowanie-hasla', name: 'ResetowanieHasla', component: ForgottenPasswordPage, meta: { requiresGuest: true, title: 'Resetowanie hasła' } },
  { path: '/reset-hasla', name: 'ResetHasla', component: ResetPassword, meta: { requiresGuest: true, title: 'Reset Hasła' } },
  { path: '/rejestracja-uzupelnienie', name: 'RejestracjaUzupelnienie', component: RegisterPageComplete, meta: { requiresAuth: true, title: 'Uzupełnij rejestrację' } },
  { path: '/powitanie', name: 'Powitanie', component: Welcome, meta: { title: 'Powitanie' } },
  { path: '/moje-piwa', name: 'MojePiwa', component: MyBeers, meta: { requiresAuth: true, title: 'Moje Piwa' } },
  { path: '/profil', name: 'Profil', component: ProfilePage, meta: { title: 'Profil' } },
  { path: '/chat', name: 'Chat', component: Chat, meta: { title: 'Chat' } },
  { path: '/chat/:id', name: 'ChatRoom', component: ChatRoom, meta: { title: 'Chat Room' } },
  { path: '/ranking', name: 'Ranking', component: Ranking, meta: { requiresAuth: true, title: 'Ranking' } },
  { path: '/odkrywaj', name: 'Odkrywaj', component: DiscoverView, meta: { requiresAuth: true, title: 'Odkrywaj' } },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresGuest && token) {
    return next('/dashboard')
  }

  if (to.meta.requiresAuth && !token) {
    return next('/logowanie')
  }

  next()
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Moja Aplikacja' 
})

export default router
