<script setup lang="ts">
import PDropdown from '@/components/dropdown/dropdown.vue'
import type { MenuOption } from '@/components/dropdown/types'

const options: MenuOption[] = [
  { key: 1, label: 'one' },
  { key: 2, label: 'sss', disabled: true },
  { key: 3, label: 'ico', divided: true },
  { key: 4, label: 'kxk' }
]
</script>

<template>
  <p-dropdown :menu-options="options" trigger="hover" placement="bottom">
    <div style="width: 200px; height: 200px; background-color: pink"></div>
  </p-dropdown>
</template>
