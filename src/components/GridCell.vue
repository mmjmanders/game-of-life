<script setup lang="ts">
import { useGameOfLifeStore } from '@/stores'
import { computed } from 'vue'

const props = defineProps<{
  row: number
  col: number
}>()

const store = useGameOfLifeStore()

const onToggleCell = () => {
  if (store.isSimulating) return
  if (store.isSelecting) {
    store.toggleCell(props.row, props.col)
  }
}

const isAlive = computed(() => store.isAlive(props.row, props.col))
</script>

<template>
  <div
    class="game-grid-cell"
    :class="{ 'is-alive': isAlive, disabled: store.isSimulating }"
    @mouseenter="onToggleCell"
  />
</template>

<style scoped></style>
