import { defineStore } from 'pinia'
import type { Grid } from '@/types'
import { computed, ref, watch } from 'vue'

export const useGameOfLifeStore = defineStore('game-of-life', () => {
  const cache = new Map<string, Grid>()

  const interval = ref<number>()
  const grid = ref<Grid>()
  const size = computed<number>(() => Math.sqrt(grid.value?.length || 0))
  const isSimulating = computed<boolean>(() => interval.value !== undefined)
  const initialized = computed<boolean>(() => grid.value !== undefined && size.value !== undefined)
  const isSelecting = ref<boolean>(false)
  const intervalMs = ref<number>(500)

  function init(size: number) {
    if (size <= 0) throw Error('Size must be greater than 0')
    grid.value = new Uint8Array({ length: size * size })
  }

  function toggleCell(x: number, y: number) {
    const updated = new Uint8Array(grid.value!)
    updated[y * size.value! + x] = grid.value![y * size.value! + x] ? 0 : 1
    grid.value = updated
  }

  function isAlive(x: number, y: number): boolean {
    return grid.value![y * size.value! + x] === 1
  }

  function startSimulation() {
    if (interval.value) {
      clearInterval(interval.value)
      interval.value = undefined
    }
    nextGeneration()
    interval.value = setInterval(() => nextGeneration(), intervalMs.value)
  }

  function stopSimulation() {
    if (interval.value) {
      clearInterval(interval.value)
      interval.value = undefined
    }
  }

  function countAliveNeighbors(x: number, y: number): number {
    let count = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dy === 0 && dx === 0) continue
        const nx = x + dx
        const ny = y + dy

        if (nx < 0 || nx >= size.value! || ny < 0 || ny >= size.value!) continue

        if (isAlive(nx, ny)) count++
      }
    }
    return count
  }

  function nextGeneration() {
    if (!initialized.value) throw Error('Grid not initialized')

    const key = btoa(String.fromCharCode(...grid.value!))
    if (cache.has(key)) {
      grid.value = cache.get(key)!
    } else {
      const nextGrid = new Uint8Array(grid.value!.length)
      for (let y = 0; y < size.value!; y++) {
        for (let x = 0; x < size.value!; x++) {
          const neighbors = countAliveNeighbors(x, y)
          const alive = isAlive(x, y)
          if (neighbors === 3 || (alive && neighbors === 2)) {
            nextGrid[y * size.value! + x] = 1
          } else {
            nextGrid[y * size.value! + x] = 0
          }
        }
      }
      cache.set(key, nextGrid)
      grid.value = nextGrid
    }
  }

  function startSelecting() {
    isSelecting.value = true
  }

  function stopSelecting() {
    isSelecting.value = false
  }

  function updateInterval(ms: number) {
    intervalMs.value = ms
  }

  watch(intervalMs, () => {
    startSimulation()
  })

  return {
    grid,
    init,
    toggleCell,
    size,
    isAlive,
    isSimulating,
    startSimulation,
    stopSimulation,
    nextGeneration,
    isSelecting,
    startSelecting,
    stopSelecting,
    updateInterval,
  }
})
