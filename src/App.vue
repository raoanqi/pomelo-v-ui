<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from '@/components/button/button.vue'
import type { ButtonInstance } from '@/components/button/types'
import PIcon from '@/components/icon/icon.vue'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
})
</script>

<template>
  <div>
    <Button ref="buttonRef" type="primary" loading></Button>
    <Button ref="buttonRef" type="primary" icon="arrow-up"></Button>
    <p-icon icon="arrow-up" size="2xl" spin color="pink" />
  </div>
</template>
