<template>
  <TitledCard class="q-mb-lg" title="Currency">
    <CurrencyList />
  </TitledCard>
</template>

<script setup lang="ts">
// Vue
import { computed, provide } from 'vue';

// Ours - Store
import { useCurrenciesStore } from 'stores/currencies';
import { useUserStore } from 'stores/user';

const userStore = useUserStore();

const currenciesStore = useCurrenciesStore();
currenciesStore.refresh();
const currencies = computed(() =>
  currenciesStore.items.filter((currency) =>
    currency.characterIds.includes(userStore.user.characterId),
  ),
);
provide('currencies', currencies);
provide(
  'currencyNames',
  computed(() => {
    const currencyNames = new Map();
    currencies.value.forEach((currency) =>
      currencyNames.set(currency.id, currency.name),
    );
    return currencyNames;
  }),
);
</script>
