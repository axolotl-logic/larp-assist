<template>
  <q-page padding>
    <MotdManager/>
  </q-page>
</template>

<script lang="ts">
// Vue
import { defineComponent } from 'vue'

// Ours
import MotdManager from 'components/MotdManager.vue'

export default defineComponent({
  components: {MotdManager}
})
</script>
