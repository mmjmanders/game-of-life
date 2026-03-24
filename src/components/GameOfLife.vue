<script setup lang="ts">
import GridSizeForm from './GridSizeForm.vue'
import { useGameOfLife } from '@/composables'
import GridComponent from './GridComponent.vue'

const { grid, init, isAlive, size, toggleCell } = useGameOfLife()

const onCreateGrid = (size: number) => {
  init(size)
}

const onToggleCell = (x: number, y: number) => {
  toggleCell(x, y)
}
</script>

<template>
  <GridSizeForm @create-grid="onCreateGrid" />
  <GridComponent v-if="grid" :grid="grid" :size="size" @toggle-cell="onToggleCell" />
</template>

<style scoped></style>
