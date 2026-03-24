import * as yup from 'yup'

export type Grid = Uint8Array

export const MIN_GRID_SIZE = 3
export const MAX_GRID_SIZE = 25

export const gridSizeSchema = yup.object({
  size: yup.number().min(MIN_GRID_SIZE).max(MAX_GRID_SIZE).required(),
})

export interface GridSize extends yup.InferType<typeof gridSizeSchema> {}
