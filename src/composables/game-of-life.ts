import { computed, ref } from 'vue'
import type { Grid } from '@/types'

export const useGameOfLife = () => {
  const cache = new Map<string, Grid>()

  const grid = ref<Grid>()
  const size = computed<number>(() => Math.sqrt(grid.value?.length || 0))

  const init = (size: number) => {
    if (size <= 0) throw Error('Size must be greater than 0')
    grid.value = new Uint8Array({ length: size * size })
  }

  const checkCell = (x: number, y: number) => {
    if (!size.value || !grid.value) {
      throw Error('Grid not initialized')
    } else if (x < 0 || x >= size.value || y < 0 || y >= size.value) {
      throw Error('Invalid cell coordinates')
    }
  }

  const toggleCell = (x: number, y: number) => {
    checkCell(x, y)
    const updated = new Uint8Array(grid.value!)
    updated[y * size.value! + x] = grid.value![y * size.value! + x] ? 0 : 1
    grid.value = updated
  }

  const isAlive = (x: number, y: number): boolean => {
    checkCell(x, y)
    return grid.value![y * size.value! + x] === 1
  }

  const hash = () => btoa(String.fromCharCode(...(grid.value || [])))

  return { grid, init, toggleCell, size, isAlive }
}
