<script setup lang="ts">
import GameOfLife from '@/components/GameOfLife.vue'

const { VITE_APP_VERSION: version } = import.meta.env
</script>

<template>
  <header>
    <h1>
      Conway's Game of Life
      <span class="version">{{ version || 'dev' }}</span>
    </h1>
  </header>
  <main>
    <GameOfLife />
  </main>
</template>

<style scoped></style>
