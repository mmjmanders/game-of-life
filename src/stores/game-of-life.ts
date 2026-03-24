import { defineStore } from 'pinia'
import type { Grid } from '@/types'
import { computed, ref } from 'vue'

export const useGameOfLifeStore = defineStore('game-of-life', () => {
  const grid = ref<Grid>()
  const size = computed<number>(() => Math.sqrt(grid.value?.length || 0))
  const interval = ref<number>()
  const isSimulating = computed<boolean>(() => interval.value !== undefined)
  const initialized = computed<boolean>(() => grid.value !== undefined && size.value !== undefined)

  function init(size: number) {
    if (size <= 0) throw Error('Size must be greater than 0')
    grid.value = new Uint8Array({ length: size * size })
  }

  function checkCell(x: number, y: number) {
    if (!initialized.value) {
      throw Error('Grid not initialized')
    } else if (x < 0 || x >= size.value || y < 0 || y >= size.value) {
      throw Error('Invalid cell coordinates')
    }
  }

  function toggleCell(x: number, y: number) {
    checkCell(x, y)
    const updated = new Uint8Array(grid.value!)
    updated[y * size.value! + x] = grid.value![y * size.value! + x] ? 0 : 1
    grid.value = updated
  }

  function isAlive(x: number, y: number): boolean {
    checkCell(x, y)
    return grid.value![y * size.value! + x] === 1
  }

  function startSimulation() {
    if (isSimulating.value) return
    interval.value = setInterval(() => nextGeneration(), 500)
  }

  function stopSimulation() {
    if (interval.value) {
      clearInterval(interval.value)
      interval.value = undefined
    }
  }

  function countAliveNeighbors(x: number, y: number): number {
    checkCell(x, y)
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
    grid.value = nextGrid
  }

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
  }
})
