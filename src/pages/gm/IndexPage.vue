<template>
  <CharacterCrudTable />
  <MotdCrudTable />
  <DivinationCrudTable />
  <CurrencyCrudTable />
  <MarketCrudTable />
  <BookCrudTable />
  <TrapCrudTable />
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';

// Ours - Components
import BookCrudTable from 'components/gm/BookCrudTable.vue';
import CharacterCrudTable from 'components/gm/CharacterCrudTable.vue';
import CurrencyCrudTable from 'components/gm/CurrencyCrudTable.vue';
import DivinationCrudTable from 'components/gm/DivinationCrudTable.vue';
import MarketCrudTable from 'components/gm/MarketCrudTable.vue';
import MotdCrudTable from 'components/gm/MotdCrudTable.vue';
import TrapCrudTable from 'components/gm/TrapCrudTable.vue';

// Ours - Store
import { useCharactersStore } from '~/stores/characters';
import { useCurrenciesStore } from '~/stores/currencies';
import { useTrapsStore } from '~/stores/traps';

const charactersStore = useCharactersStore();
charactersStore.refresh();
provide(
  'characterNames',
  computed(() => charactersStore.getCharacterNames()),
);

const currenciesStore = useCurrenciesStore();
currenciesStore.refresh();
provide('currencyNames', computed(currenciesStore.getCurrencyNames));

const trapsStore = useTrapsStore();
trapsStore.refresh();
provide(
  'trapsById',
  computed(() => trapsStore.itemsById),
);
</script>
