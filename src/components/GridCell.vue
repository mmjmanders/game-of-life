<script setup lang="ts">
import { useGameOfLifeStore } from '@/stores'
import { computed } from 'vue'

const props = defineProps<{
  row: number
  col: number
}>()

const gameOfLife = useGameOfLifeStore()

const onClickCell = (x: number, y: number) => {
  if (gameOfLife.isSimulating) return
  gameOfLife.toggleCell(x, y)
}

const isAlive = computed(() => gameOfLife.isAlive(props.row, props.col))
</script>

<template>
  <div
    class="game-grid-cell"
    :class="{ 'is-alive': isAlive, disabled: gameOfLife.isSimulating }"
    @click="onClickCell(row, col)"
  />
</template>

<style scoped></style>
