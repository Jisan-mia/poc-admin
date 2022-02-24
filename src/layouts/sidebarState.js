import { ref, computed } from 'vue'

export const visibleSidebar = ref(true)
export const setVisibleSidebar = (bool) => (visibleSidebar.value = bool)
