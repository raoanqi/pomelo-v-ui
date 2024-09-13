import type { Ref, InjectionKey } from 'vue'

// 经常要用到，因此提取出来
export type NameType = string | number

export interface CollapseProps {
  modelValue: NameType[]
  accordion?: boolean
}

export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void

  (e: 'change', values: NameType[]): void
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContext')
