<template>
  <q-card class="q-mb-md" v-for="motd in motds" v-bind:key="motd.id">
    <q-card-section>
      {{ motd.content }}
    </q-card-section>
  </q-card>
</template>

<script lang="ts">

export default {
  props: ['motds']
}
</script>

<style>
.page {
  max-width: 800px;
}
</style>
