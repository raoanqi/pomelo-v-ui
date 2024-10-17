import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  /**
   * @param e
   *
   */
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target && !elementRef.value.contains(e.target)) {
      callback(e)
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', hanlder)
  })
}

export default useClickOutside
