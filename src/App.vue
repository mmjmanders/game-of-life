<script setup lang="ts">
import GameOfLife from '@/components/GameOfLife.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { VITE_APP_VERSION: version, VITE_GITHUB_REPOSITORY_URL: url } = import.meta.env
</script>

<template>
  <header>
    <h1>
      Conway's Game of Life
      <a v-if="version && url" class="version" :href="url" target="_blank" rel="noopener">
        <FontAwesomeIcon :icon="['fab', 'github']" />
        {{ version }}
      </a>
    </h1>
  </header>
  <main>
    <GameOfLife />
  </main>
</template>

<style scoped></style>
