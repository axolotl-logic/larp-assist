<template>
  <q-page padding>
    <MotdCrudTable/>
    <DivinationCrudTable/>
    <TransactionCrudTable/>
    <CurrencyCrudTable/>
  </q-page>
</template>

<script lang="ts">
// Vue
import { defineComponent } from 'vue'

// Ours
import MotdCrudTable from 'components/MotdCrudTable.vue'
import CurrencyCrudTable from 'components/CurrencyCrudTable.vue'
import DivinationCrudTable from 'components/DivinationCrudTable.vue'
import TransactionCrudTable from 'components/TransactionCrudTable.vue'

export default defineComponent({
  components: {MotdCrudTable, DivinationCrudTable, TransactionCrudTable, CurrencyCrudTable}
})
</script>
