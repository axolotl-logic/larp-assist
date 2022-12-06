<template>
  <q-select
      multiple
      clearable
      filled
      map-options
      use-chips
      stack-label
      emit-value
      :options="userNameOptions"
      @input="$emit('update:modelValue', $event.target.value)"
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
