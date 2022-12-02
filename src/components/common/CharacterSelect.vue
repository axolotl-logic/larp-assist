<template>
  <q-select
      clearable
      filled
      map-options
      emit-value
      @input="$emit('update:modelValue', $event.target.value)"
      :options="userNameOptions"
      :label="label" />
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

defineProps({
  label: String
})

const userNames = inject('userNames')

const userNameOptions = computed(() => {
  const options = []
  userNames.value.forEach((name, userId) =>
    options.push({
      label: name,
      value: userId
    })
  )

  return options
})
</script>
