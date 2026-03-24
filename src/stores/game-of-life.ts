import { defineStore } from 'pinia'
import type { Grid } from '@/types'
import { computed, ref } from 'vue'

export const useGameOfLifeStore = defineStore('game-of-life', () => {
  const cache = new Map<string, Grid>()

  const grid = ref<Grid>()
  const size = computed<number>(() => Math.sqrt(grid.value?.length || 0))

  function init(size: number) {
    if (size <= 0) throw Error('Size must be greater than 0')
    grid.value = new Uint8Array({ length: size * size })
  }

  function checkCell(x: number, y: number) {
    if (!size.value || !grid.value) {
      throw Error('Grid not initialized')
    } else if (x < 0 || x >= size.value || y < 0 || y >= size.value) {
      throw Error('Invalid cell coordinates')
    }
  }

  function hash() {
    return btoa(String.fromCharCode(...(grid.value || [])))
  }

  function toggleCell(x: number, y: number) {
    checkCell(x, y)
    const updated = new Uint8Array(grid.value!)
    updated[y * size.value! + x] = grid.value![y * size.value! + x] ? 0 : 1
    grid.value = updated
  }

  function isAlive(x: number, y: number) {
    checkCell(x, y)
    return grid.value![y * size.value! + x] === 1
  }

  return { grid, init, toggleCell, size, isAlive }
})
