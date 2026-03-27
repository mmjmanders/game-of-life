<script setup lang="ts">
import { useForm } from 'vee-validate'
import { type GridSize, gridSizeSchema, MAX_GRID_SIZE, MIN_GRID_SIZE } from '@/types'
import { toTypedSchema } from '@vee-validate/yup'
import { useGameOfLifeStore } from '@/stores'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

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

const speed = ref<number>(5)

const gameOfLife = useGameOfLifeStore()
</script>

<template>
  <form @submit.prevent="onSubmit" novalidate class="game-grid-size-form">
    <div class="form-row">
      <div class="form-section">
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
        <button type="submit" :disabled="!meta.valid || gameOfLife.isSimulating">
          Create grid
        </button>
      </div>
      <div class="form-section">
        <button
          type="button"
          :disabled="gameOfLife.isSimulating || !gameOfLife.grid"
          @click="gameOfLife.nextGeneration()"
        >
          <FontAwesomeIcon :icon="['fas', 'forward-step']" />
          Next
        </button>
        <button
          type="button"
          v-if="!gameOfLife.isSimulating"
          :disabled="!gameOfLife.grid"
          @click="gameOfLife.startSimulation()"
        >
          <FontAwesomeIcon :icon="['fas', 'play']" />
          Start
        </button>
        <button
          type="button"
          v-if="gameOfLife.isSimulating"
          @click="gameOfLife.stopSimulation()"
          class="stop-btn"
        >
          <FontAwesomeIcon :icon="['fas', 'stop']" />
          Stop
        </button>
      </div>
    </div>
    <div class="game-grid-slider-container">
      <label for="slider">Speed</label>
      <v-slider
        id="slider"
        class="game-grid-slider"
        v-model="speed"
        min="2"
        max="10"
        step="1"
      ></v-slider>
    </div>
    <div>{{ speed }}</div>
  </form>
</template>

<style scoped></style>
