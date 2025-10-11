import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserPage from '../pages/RegisterPage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Welcome from '@/pages/Welcome.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/register', name: 'Register', component: UserPage },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/welcome', name: 'Welcome', component: Welcome },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
