<script setup lang="ts">
import GridCell from './GridCell.vue'

defineProps<{
  row: number
  size: number
}>()
</script>

<template>
  <div class="game-grid-row">
    <GridCell v-for="col in size" :key="col - 1" :row="row" :col="col - 1" />
  </div>
</template>

<style scoped></style>
