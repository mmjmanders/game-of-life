import { defineStore } from 'pinia'
import type { Grid } from '@/types'
import { computed, ref, watch } from 'vue'

const BASE_INTERVAL_MS = 1000
const SPEED_STEP_MS = 100
const MAX_CACHE_SIZE = 1000

function speedToInterval(speed: number): number {
  return BASE_INTERVAL_MS - speed * SPEED_STEP_MS
}

export const useGameOfLifeStore = defineStore('game-of-life', () => {
  const cache = new Map<string, Grid>()

  const interval = ref<number>()
  const grid = ref<Grid>()
  const size = computed<number>(() => Math.sqrt(grid.value?.length || 0))
  const isSimulating = computed<boolean>(() => interval.value !== undefined)
  const initialized = computed<boolean>(() => grid.value !== undefined && size.value !== undefined)
  const isSelecting = ref<boolean>(false)
  const intervalMs = ref<number>()

  function init(gridSize: number, speed: number) {
    if (gridSize <= 0) throw Error('Size must be greater than 0')

    stopSimulation()
    cache.clear()
    intervalMs.value = speedToInterval(speed)
    grid.value = new Uint8Array({ length: gridSize * gridSize })
  }

  function toggleCell(x: number, y: number) {
    const updated = new Uint8Array(grid.value!)
    updated[y * size.value + x] = grid.value![y * size.value + x] ? 0 : 1
    grid.value = updated
  }

  function isAlive(x: number, y: number): boolean {
    return grid.value![y * size.value + x] === 1
  }

  function stopSimulation() {
    if (interval.value) {
      clearInterval(interval.value)
      interval.value = undefined
    }
  }

  function startSimulation({ advance = true } = {}) {
    stopSimulation()
    if (advance) nextGeneration()
    interval.value = setInterval(() => nextGeneration(), intervalMs.value)
  }

  function countAliveNeighbors(x: number, y: number): number {
    const s = size.value
    let count = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dy === 0 && dx === 0) continue
        const nx = x + dx
        const ny = y + dy

        if (nx < 0 || nx >= s || ny < 0 || ny >= s) continue

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
      const s = size.value
      const nextGrid = new Uint8Array(grid.value!.length)
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          const neighbors = countAliveNeighbors(x, y)
          const alive = isAlive(x, y)
          nextGrid[y * s + x] = neighbors === 3 || (alive && neighbors === 2) ? 1 : 0
        }
      }
      if (cache.size >= MAX_CACHE_SIZE) {
        const firstKey = cache.keys().next().value!
        cache.delete(firstKey)
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

  function updateSpeed(speed: number) {
    intervalMs.value = speedToInterval(speed)
  }

  watch(intervalMs, (value, oldValue) => {
    if (oldValue && isSimulating.value && value !== oldValue) startSimulation({ advance: false })
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
    updateSpeed,
  }
})
