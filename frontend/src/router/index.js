import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../pages/RegisterPage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import LoginPage from '@/pages/LoginPage.vue'
import MainPage from '@/pages/MainPage.vue'
import ForgottenPasswordPage from '@/pages/ForgottenPasswordPage.vue'
import RegisterPageComplete from '@/pages/RegisterPage-Complete.vue'

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/rejestracja', name: 'Rejestracja', component: RegisterPage },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/logowanie', name: 'Logowanie', component: LoginPage },
  { path: '/resetowanie-hasla', name: 'ZapomnianeHaslo', component: ForgottenPasswordPage },
  {
    path: '/rejestracja-uzupelnienie',
    name: 'RejestracjaUzupełnienie',
    component: RegisterPageComplete,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
