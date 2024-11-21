import type { VNode } from 'vue'
import type { TooltipProps } from '@/components/tooltip/types'

// 借助tooltip来实现，因此需要继承tooltip的props，但是有一些新的props，所以使用extends
export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[]
}

export interface MenuOption {
  // 展示的内容，不仅仅可能是string
  label: string | VNode
  key: string | number
  disabled?: boolean
  divided?: boolean
}

export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void

  // 点击对应item时，会将对应的选项向上抛出
  (e: 'select', value: MenuOption): void
}

export interface DropdownInstance {
  show: () => void
  hide: () => void
}
