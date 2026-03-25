<script setup lang="ts">
import { useForm } from 'vee-validate'
import { type GridSize, gridSizeSchema, MAX_GRID_SIZE, MIN_GRID_SIZE } from '@/types'
import { toTypedSchema } from '@vee-validate/yup'
import { useGameOfLifeStore } from '@/stores'
import PlayArrowRoundedIcon from '@iconify-vue/material-symbols/play-arrow-rounded'
import StopRoundedIcon from '@iconify-vue/material-symbols/stop-rounded'
import SkipNextRoundedIcon from '@iconify-vue/material-symbols/skip-next-rounded'

const { handleSubmit, defineField, meta } = useForm<GridSize>({
  validationSchema: toTypedSchema(gridSizeSchema),
  initialValues: {
    size: 5,
  },
})

const [gridSize, gridSizeAttrs] = defineField('size')

const emit = defineEmits<{
  'create-grid': [size: number]
}>()

const onSubmit = handleSubmit(({ size }) => {
  emit('create-grid', size)
})

const gameOfLife = useGameOfLifeStore()
</script>

<template>
  <form @submit.prevent="onSubmit" novalidate class="game-grid-size-form">
    <fieldset>
      <label for="grid-size">Grid Size</label>
      <input
        id="grid-size"
        v-model="gridSize"
        v-bind="gridSizeAttrs"
        type="number"
        step="1"
        :min="MIN_GRID_SIZE"
        :max="MAX_GRID_SIZE"
      />
    </fieldset>
    <button type="submit" :disabled="!meta.valid || gameOfLife.isSimulating">Create grid</button>
    <button
      type="button"
      :disabled="gameOfLife.isSimulating || !gameOfLife.grid"
      @click="gameOfLife.nextGeneration()"
    >
      <SkipNextRoundedIcon />
      Next
    </button>
    <button
      type="button"
      v-if="!gameOfLife.isSimulating"
      :disabled="!gameOfLife.grid"
      @click="gameOfLife.startSimulation()"
    >
      <PlayArrowRoundedIcon />
      Start
    </button>
    <button type="button" v-if="gameOfLife.isSimulating" @click="gameOfLife.stopSimulation()">
      <StopRoundedIcon />
      Stop
    </button>
  </form>
</template>

<style scoped></style>
