<script setup lang="ts">
import GridCell from './GridCell.vue'

defineProps<{
  row: number
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
  <div class="game-grid-row">
    <GridCell
      v-for="col in size"
      :key="col - 1"
      :row="row"
      :col="col - 1"
      @toggle-cell="onToggleCell"
    />
  </div>
</template>

<style scoped></style>
