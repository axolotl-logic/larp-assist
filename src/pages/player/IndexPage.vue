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
    <CurrencyList
        :currencies="currencies"
        :marketsByCurrencyId="marketsByCurrencyId"/>
  </TitledCard>
</template>

<script lang="ts">
// Vue
import { defineComponent, computed } from 'vue'

// Ours - Stores
import { useUserStore } from 'stores/user'
import { useMotdsStore } from 'stores/motds'
import { useDivinationsStore } from 'stores/divinations'
import { useCurrenciesStore } from 'stores/currencies'
import { useMarketsStore } from 'stores/markets'

// Ours - Components
import TitledCard from 'components/TitledCard.vue'
import MotdsList from 'components/MotdsList.vue'
import DivinationsList from 'components/DivinationsList.vue'
import CurrencyList from 'components/CurrencyList.vue'

export default defineComponent({
  components: {
    TitledCard,
    MotdsList,
    DivinationsList,
    CurrencyList,
  },
  setup() {
    const userStore = useUserStore()
    const motdsStore = useMotdsStore()
    const divinationsStore = useDivinationsStore()
    const currenciesStore = useCurrenciesStore()
    const marketsStore = useMarketsStore()

    motdsStore.fetch()
    divinationsStore.fetch()
    currenciesStore.fetch()
    marketsStore.fetch()

    return {
      name: computed(() => userStore.user.name),
      motds: computed(() => motdsStore.motds),
      divinations: computed(() => divinationsStore.divinations),
      currencies: computed(() => currenciesStore.currencies),
      marketsByCurrencyId: computed(() => marketsStore.marketsByCurrencyId),
    }
  },
})
</script>
