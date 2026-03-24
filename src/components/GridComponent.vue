<script setup lang="ts">
import type { Grid } from '@/types'
import GridRow from './GridRow.vue'

defineProps<{
  grid: Grid
  size: number
}>()
</script>

<template>
  <div class="game-grid">
    <GridRow v-for="row in size" :key="row - 1" :row="row - 1" :size="size" />
  </div>
</template>

<style scoped></style>
