<template>
  <MotdCrudTable/>
  <DivinationCrudTable/>
  <TransactionCrudTable/>
  <CurrencyCrudTable/>
  <MarketCrudTable/>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'

// Ours - Components
import MotdCrudTable from 'components/gm/MotdCrudTable.vue'
import CurrencyCrudTable from 'components/gm/CurrencyCrudTable.vue'
import DivinationCrudTable from 'components/gm/DivinationCrudTable.vue'
import TransactionCrudTable from 'components/gm/TransactionCrudTable.vue'
import MarketCrudTable from 'components/gm/MarketCrudTable.vue'

// Ours - Store
import { useUserStore } from 'stores/user'
import { useCurrenciesStore } from 'stores/currencies'

const userStore = useUserStore()
userStore.fetchUserNames()

provide('userNames', computed(() => userStore.userNames))

const currenciesStore = useCurrenciesStore()
currenciesStore.refresh()

provide('currencyNames', computed(() => currenciesStore.currencyNames))
</script>
