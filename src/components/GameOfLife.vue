<script setup lang="ts">
import GridSizeForm from './GridSizeForm.vue'
import { useGameOfLifeStore } from '@/stores'
import GridComponent from './GridComponent.vue'

const store = useGameOfLifeStore()

const onCreateGrid = (size: number, speed: number) => {
  store.init(size, speed)
}
</script>

<template>
  <GridSizeForm @create-grid="onCreateGrid" />
  <GridComponent v-if="store.grid" />
</template>

<style scoped></style>
