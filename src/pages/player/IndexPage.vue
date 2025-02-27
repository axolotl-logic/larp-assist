<template>a</template>

<style lang="scss">
.heading {
  text-shadow: 1px 1px 1px $dark;
}
</style>

<script setup lang="ts">
// Vue
import { computed, provide } from 'vue';

// Ours - Stores
import { useCharactersStore } from '~/stores/characters';
import { useCurrenciesStore } from '~/stores/currencies';
import { useDivinationsStore } from '~/stores/divinations';
import { useMarketsStore } from '~/stores/markets';
import { useMotdsStore } from '~/stores/motds';

// Ours - Components
import { useUserStore } from '~/stores/user';

const motdsStore = useMotdsStore();
motdsStore.refresh();

const divinationsStore = useDivinationsStore();
divinationsStore.refresh();

const charactersStore = useCharactersStore();
charactersStore.refresh();
provide('characterNames', computed(charactersStore.getCharacterNames));

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

const marketsStore = useMarketsStore();
marketsStore.refresh();
provide(
  'markets',
  computed(() => marketsStore.getCharacterMarkets(userStore.user.characterId)),
);
</script>
