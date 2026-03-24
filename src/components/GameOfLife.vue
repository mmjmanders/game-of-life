<script setup lang="ts">
import GridSizeForm from './GridSizeForm.vue'
import { useGameOfLifeStore } from '@/stores'
import GridComponent from './GridComponent.vue'

const gameOfLife = useGameOfLifeStore()

const onCreateGrid = (size: number) => {
  gameOfLife.init(size)
}
</script>

<template>
  <GridSizeForm @create-grid="onCreateGrid" />
  <GridComponent v-if="gameOfLife.grid" :grid="gameOfLife.grid" :size="gameOfLife.size" />
</template>

<style scoped></style>
