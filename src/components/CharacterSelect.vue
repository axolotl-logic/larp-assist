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

<script lang="ts">
// Ours
export default {
  props: [ 'userNames', 'label' ],

  computed: {
    userNameOptions() {
      const userNameOptions = []
      this.userNames.forEach((name, userId) =>
        userNameOptions.push({
          label: name,
          value: userId
        })
      )

      console.log(userNameOptions)

      return userNameOptions
    }
  },
}
</script>
