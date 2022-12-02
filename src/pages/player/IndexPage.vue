<template>
  <div class="text-h5 q-mb-lg">
    {{ name }},
  </div>
  <TitledCard class="q-mb-lg" title="MOTDs">
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
  <TitledCard class="q-mb-lg" title="Currency">
    <!--CurrencyList
        :currencies="currencies"
        :marketsByCurrencyId="marketsByCurrencyId"/-->
  </TitledCard>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue'

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
import CurrencyList from 'components/player/CurrencyList.vue'

const motdsStore = useMotdsStore()
motdsStore.refresh()

const divinationsStore = useDivinationsStore()
divinationsStore.refresh()

const currenciesStore = useCurrenciesStore()
currenciesStore.refresh()

const marketsStore = useMarketsStore()
marketsStore.refresh()

const userStore = useUserStore()

const name = computed(() => userStore.user.name)
const motds = computed(() => motdsStore.items)
const divinations = computed(() => divinationsStore.items)
const currencies = computed(() => currenciesStore.items)
const marketsByCurrencyId = computed(() => marketsStore.marketsByCurrencyId)
</script>
