<script setup lang="ts">
import { ref, reactive, watch, onUnmounted, computed } from 'vue'
import { type Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import type {
  TooltipProps,
  TooltipEmits,
  TooltipInstance
} from '@/components/tooltip/types'
import useClickOutside from '@/hooks/useClickOutside'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'PTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
/**
 * popperoptions中也包含使用placement的，因此进行合并
 */
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  }
})
const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
/**
 * opendebounce，canceldebounce已经能够解决防抖的问题，但是还是有个问题，如果
 * 最终需要执行open，之前的close依然会被执行，我们希望如果最后执行的是open，那么前面的close也不要执行了
 */
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events.mouseenter = openFinal
    outerEvents.mouseleave = closeFinal
  } else if (props.trigger === 'click') {
    events.click = togglePopper
  }
}
/**
 * 当手动控制tooltip显示隐藏时，hover和click就不需要生效
 */
if (!props.manual) {
  attachEvents()
}
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)
watch(
  isOpen,
  (newVal) => {
    if (newVal) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        )
      } else {
        popperInstance?.destroy()
      }
    }
  },
  // 这里watch的逻辑依赖到了dom，因此watch需要等待dom更新之后再触发，所以flush设置为post
  { flush: 'post' }
)
// 在组件销毁时销毁popper实例
onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})
</script>

<template>
  <!--v-on="outerEvents"：事件并不是确定的，这里使用动态事件-->
  <div class="p-tooltip" ref="popperContainerNode" v-on="outerEvents">
    <!--触发节点-->
    <div class="p-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <!--展示节点-->
    <Transition :name="transition">
      <div v-if="isOpen" class="p-tooltip__popper" ref="popperNode">
        <slot name="content">
          {{ content }}
        </slot>
        <!-- popper的箭头 -->
        <div id="arrow" data-popper-arrow />
      </div>
    </Transition>
  </div>
</template>
