<template>
  <q-list class="text-body1">
    <q-expansion-item
        v-for="divination in divinations"
        v-bind:key="divination.uid"
        expand-separator
        :label="divination.name">
      <q-card>
        <q-card-section>
          {{ divination.content }}
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
export default {
  props: ['divinations']
}
</script>
