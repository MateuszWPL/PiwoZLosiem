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
import Chat from '@/pages/Chat.vue'
import ChatRoom from '@/pages/ChatRoom.vue'

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/rejestracja', name: 'Rejestracja', component: RegisterPage },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/logowanie', name: 'Logowanie', component: LoginPage, meta: { requiresGuest: true } },
  {
    path: '/resetowanie-hasla',
    name: 'ResetowanieHasla',
    component: ForgottenPasswordPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/rejestracja-uzupelnienie',
    name: 'RejestracjaUzupelnienie',
    component: RegisterPageComplete,
    meta: { requiresAuth: true },
  },
  { path: '/powitanie', name: 'Powitanie', component: Welcome },
  { path: '/chat', name: 'Chat', component: Chat },
  { path: '/chat/:id', name: 'ChatRoom', component: ChatRoom },
  { path: '/ranking', name: 'Ranking', component: Ranking, meta: { requiresAuth: true } },
  { path: '/moje-piwa', name: 'MojePiwa', component: MyBeers, meta: { requiresAuth: true } },
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

export default router
