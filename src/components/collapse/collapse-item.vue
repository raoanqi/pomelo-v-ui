<script setup lang="ts">
import { inject, computed } from 'vue'
import type { CollapseItemProps } from '@/components/collapse/types'
import { collapseContextKey } from '@/components/collapse/types'
import Icon from '@/components/icon/icon.vue'

defineOptions({
  name: 'PCollapseItem'
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey)
const isActive = computed(() =>
  collapseContext?.activeNames.value.includes(props.name)
)
const handleClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  /**
   * @param el
   * 请注意：el.style.xxx控制的是元素的内联样式
   * 动画完成之后，清空height，实际上相当于移除了元素上内联的height样式
   * 此时，元素的高度将按照 CSS 规则或默认的布局规则计算，不再受内联 height 属性的限制
   */
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}
</script>

<template>
  <div class="p-collapse-item" :class="{ 'is-disabled': disabled }">
    <div
      class="p-collapse-item__header"
      :class="{ 'is-disabled': disabled, 'is-active': isActive }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="header">{{ title }}</slot>
      <icon icon="align-right" class="header-angle" />
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="p-collapse-item__wrapper" v-show="isActive">
        <div class="p-collapse-item__content" :id="`item-header-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
