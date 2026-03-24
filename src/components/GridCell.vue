<script setup lang="ts">
defineProps<{
  row: number
  col: number
}>()

const emit = defineEmits<{
  'toggle-cell': [x: number, y: number]
}>()

const onToggleCell = (x: number, y: number) => {
  emit('toggle-cell', x, y)
}
</script>

<template>
  <div class="game-grid-cell" @click="onToggleCell(row, col)">{{ row }}-{{ col }}</div>
</template>

<style scoped></style>
