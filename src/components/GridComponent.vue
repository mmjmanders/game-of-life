<script setup lang="ts">
import type { Grid } from '@/types'
import GridRow from './GridRow.vue'

defineProps<{
  grid: Grid
  size: number
}>()

const emit = defineEmits<{
  'toggle-cell': [x: number, y: number]
}>()

const onToggleCell = (x: number, y: number) => {
  emit('toggle-cell', x, y)
}
</script>

<template>
  <div class="game-grid">
    <GridRow
      v-for="row in size"
      :key="row - 1"
      :row="row - 1"
      :size="size"
      @toggle-cell="onToggleCell"
    />
  </div>
</template>

<style scoped></style>
