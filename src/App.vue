<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PButton from '@/components/button/button.vue'
import type { ButtonInstance } from '@/components/button/types'
import PIcon from '@/components/icon/icon.vue'
import PTooltip from '@/components/tooltip/tooltip.vue'
import type { TooltipInstance } from '@/components/tooltip/types'

const tooltipRef = ref<TooltipInstance | null>(null)
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
})
</script>

<template>
  <div>
    <p-button type="success" @click="open">open</p-button>
    <p-button type="success" @click="close">close</p-button>
    <p-button ref="buttonRef" type="primary" loading></p-button>
    <p-button ref="buttonRef" type="primary" icon="arrow-up"></p-button>
    <p-icon icon="arrow-up" size="2xl" spin color="pink" />
    <p-tooltip
      content="hello world"
      trigger="hover"
      :open-delay="1000"
      :close-delay="1000"
      placement="top"
      ref="tooltipRef"
    >
      <div style="width: 200px; height: 200px; background-color: pink"></div>
    </p-tooltip>
  </div>
</template>
