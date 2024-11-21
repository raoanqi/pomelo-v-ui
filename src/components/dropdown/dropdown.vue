<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type {
  DropdownProps,
  DropdownEmits,
  DropdownInstance,
  MenuOption
} from '@/components/dropdown/types'
import type { TooltipInstance } from '@/components/tooltip/types'
import Tooltip from '@/components/tooltip/tooltip.vue'

const props = defineProps<DropdownProps>()
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
// 因为本身事件也是tooltip中抛出的，这里把tooltip中发出的visible-change事件继续抛出即可，不需要再进行处理
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}
// 点击某一项时，如果处于禁用状态，直接return，否则直接抛出select事件
const itemClick = (e: MenuOption) => {
  if (e.disabled) return
  emits('select', e)
}
// 对外暴露实例
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value.show,
  hide: () => tooltipRef.value.hide
})
</script>

<template>
  <div class="p-dropdown">
    <tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <!--默认插槽，dropdown的触发元素-->
      <slot />
      <!--这里的内容是把内容派发到tooltip中去，是每一项显示的内容-->
      <template #content>
        <ul class="p-dropdown__menu">
          <!--这里循环template而不是直接循环li，因为有可能有divided-->
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            ></li>
            <li
              class="p-dropdown__item"
              @click="($event) => itemClick(item)"
              :class="{
                'is-disable': item.disabled,
                'is-divided': item.divided
              }"
              :id="`dropdown-item-${item.key}`"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </tooltip>
  </div>
</template>
