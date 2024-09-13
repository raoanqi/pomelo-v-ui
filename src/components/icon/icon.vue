<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from '@/components/icon/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'PIcon',
  /**
   * 默认情况下，组件的inheritAttrs为true，即继承父组件的属性
   * 这样会将父组件传递的非props属性自动添加到子组件的跟元素上
   * 这里实际要使用到父组件属性的元素并不是根级别的i元素，而是内部包裹的font-awesome-icon元素
   * 所以关闭这个属性透传功能，关闭之后，可以手动控制哪里需要使用父级传递来的非props属性
   */
  inheritAttrs: false
})
const props = defineProps<IconProps>()
const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i
    class="p-icon"
    :class="{
      [`p-icon--${type}`]: type
    }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>
