import { ref, computed } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

// new
export const isActive = ref(false)
export const toggleActive = () =>  (isActive.value = !isActive.value)


export const SIDEBAR_WIDTH = 200
export const SIDEBAR_WIDTH_COLLAPSED = 38
export const sidebarWidth = computed(
    () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)