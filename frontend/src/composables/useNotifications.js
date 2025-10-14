import { ref, computed, watch } from 'vue'

const stored = localStorage.getItem('notifications')
const notifications = ref(stored ? JSON.parse(stored) : [])

export function useNotifications() {
  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    }
    notifications.value.unshift(newNotification)
    saveToStorage()
  }

  const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length)

  const latestNotifications = computed(() => notifications.value.slice(0, 3))

  const markAllAsRead = () => {
    notifications.value.forEach((n) => (n.read = true))
    saveToStorage()
  }

  const saveToStorage = () => {
    localStorage.setItem('notifications', JSON.stringify(notifications.value))
  }

  // automatycznie zapisuj przy każdej zmianie listy
  watch(
    notifications,
    (val) => {
      localStorage.setItem('notifications', JSON.stringify(val))
    },
    { deep: true },
  )

  return {
    notifications,
    addNotification,
    unreadCount,
    latestNotifications,
    markAllAsRead,
  }
}
