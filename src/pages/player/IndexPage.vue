<template>
  <div class="text-h2 q-mb-lg heading text-wizard text-center">
    The journal of {{ name }}
  </div>
  <TitledCard class="q-mb-lg" title="Missives">
    <MotdsList v-if="motds.length > 0" :motds="motds"/>
    <div v-else>
      No MOTDs
    </div>
  </TitledCard>

  <TitledCard class="q-mb-lg" title="Divinations">
    <DivinationsList v-if="divinations.length > 0" :divinations="divinations"/>
    <div v-else>
      No MOTDs
    </div>
  </TitledCard>
  <TitledCard class="q-mb-lg" title="Library">
    <BookLookup />
  </TitledCard>
  <TitledCard class="q-mb-lg" title="Currency">
    <CurrencyList />
  </TitledCard>
</template>

<style lang="scss">
.heading {
  text-shadow: 1px 1px 1px $dark;
}
</style>

<script setup lang="ts">
// Vue
import { computed, provide } from 'vue'

// Ours - Stores
import { useUserStore } from 'stores/user'
import { useMotdsStore } from 'stores/motds'
import { useDivinationsStore } from 'stores/divinations'
import { useCurrenciesStore } from 'stores/currencies'
import { useMarketsStore } from 'stores/markets'

// Ours - Components
import TitledCard from 'components/common/TitledCard.vue'
import MotdsList from 'components/player/MotdsList.vue'
import DivinationsList from 'components/player/DivinationsList.vue'
import BookLookup from 'components/common/BookLookup.vue'
import CurrencyList from 'components/player/CurrencyList.vue'

const motdsStore = useMotdsStore()
motdsStore.refresh()

const divinationsStore = useDivinationsStore()
divinationsStore.refresh()

const userStore = useUserStore()
userStore.fetchUserNames()
provide('userNames', computed(() => userStore.userNames))

const currenciesStore = useCurrenciesStore()
currenciesStore.refresh()
const currencies = computed(() => currenciesStore.items.filter(
  currency => currency.userIds.includes(userStore.user.id)
))
provide('currencies', currencies)
provide('currencyNames', computed(() => {
  const currencyNames = new Map()
  currencies.value.forEach(currency => currencyNames.set(currency.id, currency.name))
  return currencyNames
}))

const marketsStore = useMarketsStore()
marketsStore.refresh()
provide('markets', computed(() => marketsStore.items.filter(
  market => market.userIds.includes(userStore.user.id)
)))

const name = computed(() => userStore.user.name)

const motds = computed(() => motdsStore.items.filter(
  motd => !motd.userId || motd.userId == userStore.user.id
))

const divinations = computed(() => divinationsStore.items.filter(
  divination => !divination.userId || divination.userId == userStore.user.id
))
</script>
