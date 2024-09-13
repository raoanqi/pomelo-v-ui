<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'PCollapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
// 监听传入的modelValue，更新activeNames，如果不监听，那么在父组件中修改了modelValue并不会同步到当前组件中
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion only support one item opened')
}
/**
 * @param item
 * 点击item时触发的事件
 * 如果item已经展开了，就删除对应项
 * 如果还没有展开，就进行展开
 */
const handleItemClick = (item: NameType) => {
  // 开启手风琴模式，如果点击的就是当前item，就清空activeNames，因此全部的item都会关闭，如果不是，就只保留当前点击的item
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(item)
    }
  }
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}
/**
 * provide(key, value)：
 *  •	key：表示你要提供的依赖的唯一标识符，通常是一个字符串或 Symbol，用来确保 inject 能够正确获取到对应的数据。
 *  •	value：这是你提供给子组件的数据（可以是任何类型的值：对象、函数、ref、reactive等）。
 */
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<template>
  <div class="p-collapse">
    <slot></slot>
  </div>
</template>
