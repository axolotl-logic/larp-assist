<template>
  <q-card>
    <q-card-section class="bg-accent text-white">
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-card-section>
      <slot />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
export default {
  props: ['title']
}
</script>
