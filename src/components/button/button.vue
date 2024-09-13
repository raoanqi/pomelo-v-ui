<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from '@/components/button/types'
import Icon from '@/components/icon/icon.vue'

defineOptions({
  name: 'PButton'
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})
</script>

<template>
  <button
    ref="_ref"
    class="p-button"
    :class="{
      [`p-button--${type}`]: type,
      [`p-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :auto-focus="autoFocus"
    :type="nativeType"
  >
    <!--loading icon-->
    <icon v-if="loading" icon="spinner" spin />
    <!--icon-->
    <icon v-if="icon" :icon="icon" />
    <span>
      <slot>Button</slot>
    </span>
  </button>
</template>
