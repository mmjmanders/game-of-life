<script setup lang="ts">
import type { Grid } from '@/types'
import GridRow from './GridRow.vue'
import { useGameOfLifeStore } from '@/stores'
import { onUnmounted } from 'vue'

defineProps<{
  grid: Grid
  size: number
}>()

const gameOfLifeStore = useGameOfLifeStore()

const startSelecting = (e: MouseEvent) => {
  if (gameOfLifeStore.isSimulating) return
  const { row, col } = (e.target as HTMLElement).dataset
  gameOfLifeStore.startSelecting()
  gameOfLifeStore.toggleCell(Number(row), Number(col))
}

const stopSelecting = () => {
  if (gameOfLifeStore.isSimulating) return
  gameOfLifeStore.stopSelecting()
}

onUnmounted(() => {
  gameOfLifeStore.stopSimulation()
})
</script>

<template>
  <div
    class="game-grid"
    @mousedown="startSelecting"
    @mouseup="stopSelecting"
    @mouseleave="stopSelecting"
  >
    <GridRow v-for="row in size" :key="row - 1" :row="row - 1" :size="size" />
  </div>
</template>

<style scoped></style>
