<template>
  <MotdCrudTable/>
  <DivinationCrudTable/>
  <CurrencyCrudTable/>
  <MarketCrudTable/>
  <BookCrudTable/>
  <TrapCrudTable/>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'

// Ours - Components
import MotdCrudTable from 'components/gm/MotdCrudTable.vue'
import CurrencyCrudTable from 'components/gm/CurrencyCrudTable.vue'
import DivinationCrudTable from 'components/gm/DivinationCrudTable.vue'
import MarketCrudTable from 'components/gm/MarketCrudTable.vue'
import BookCrudTable from 'components/gm/BookCrudTable.vue'
import TrapCrudTable from 'components/gm/TrapCrudTable.vue'

// Ours - Store
import { useUserStore } from 'stores/user'
import { useCurrenciesStore } from 'stores/currencies'
import { useTrapsStore } from 'stores/traps'

const userStore = useUserStore()
userStore.fetchUserNames()

provide('userNames', computed(() => userStore.userNames))

const currenciesStore = useCurrenciesStore()
currenciesStore.refresh()

provide('currencyNames', computed(() => currenciesStore.currencyNames))

const trapsStore = useTrapsStore()
trapsStore.refresh()

provide('trapsById', computed(() => trapsStore.itemsById))
</script>
