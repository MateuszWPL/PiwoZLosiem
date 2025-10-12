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

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/rejestracja', name: 'Rejestracja', component: RegisterPage },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/logowanie', name: 'Logowanie', component: LoginPage, meta: { requiresGuest: true } },
  {
    path: '/resetowanie-hasla',
    name: 'ResetowanieHasla',
    component: ForgottenPasswordPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/rejestracja-uzupelnienie',
    name: 'RejestracjaUzupelnienie ',
    component: RegisterPageComplete,
  },
  { path: '/powitanie', name: 'Powitanie', component: Welcome },
  { path: '/ranking', name: 'Ranking', component: Ranking },
  { path: '/moje-piwa', name: 'MojePiwa', component: MyBeers },
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

  next()
})

export default router
