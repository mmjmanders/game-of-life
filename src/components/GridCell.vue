<script setup lang="ts">
import { useGameOfLifeStore } from '@/stores'
import { computed } from 'vue'

const props = defineProps<{
  row: number
  col: number
}>()

const gameOfLife = useGameOfLifeStore()

const onToggleCell = (e: MouseEvent) => {
  if (gameOfLife.isSimulating) return
  if (gameOfLife.isSelecting) {
    const { row, col } = (e.target as HTMLElement).dataset
    gameOfLife.toggleCell(Number(row), Number(col))
  }
}

const isAlive = computed(() => gameOfLife.isAlive(props.row, props.col))
</script>

<template>
  <div
    class="game-grid-cell"
    :class="{ 'is-alive': isAlive, disabled: gameOfLife.isSimulating }"
    :data-row="row"
    :data-col="col"
    @mouseenter="onToggleCell"
  />
</template>

<style scoped></style>
