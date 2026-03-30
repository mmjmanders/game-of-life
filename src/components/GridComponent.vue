<script setup lang="ts">
import GridRow from './GridRow.vue'
import { useGameOfLifeStore } from '@/stores'
import { onUnmounted } from 'vue'

const store = useGameOfLifeStore()

const startSelecting = () => {
  if (store.isSimulating) return
  store.startSelecting()
}

const stopSelecting = () => {
  if (store.isSimulating) return
  store.stopSelecting()
}

onUnmounted(() => {
  store.stopSimulation()
})
</script>

<template>
  <div
    class="game-grid"
    @mousedown="startSelecting"
    @mouseup="stopSelecting"
    @mouseleave="stopSelecting"
  >
    <GridRow v-for="row in store.size" :key="row - 1" :row="row - 1" :size="store.size" />
  </div>
</template>

<style scoped></style>
