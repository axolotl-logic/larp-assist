<template>
  <q-page padding>
    <MotdCrudTable/>
  </q-page>
</template>

<script lang="ts">
// Vue
import { defineComponent } from 'vue'

// Ours
import MotdCrudTable from 'components/MotdCrudTable.vue'

export default defineComponent({
  components: {MotdCrudTable}
})
</script>
