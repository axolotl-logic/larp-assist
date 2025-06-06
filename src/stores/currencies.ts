// Pinia data store
import { defineStore } from 'pinia';

// Vue

// Ours
import { Currency } from '~/models';
import { useFirestoreCollection } from '~/stores/firestore';

export const useCurrenciesStore = defineStore('currencies', () => {
  const collection = useFirestoreCollection<Currency>('currencies', {
    map: (id, data) => ({
      name: data.name,
      characterIds: data.characterIds || [],
      id: id,
    }),
  });

  return {
    ...collection,
    getCharacterCurrenciesNames: (characterId: string) => {
      collection.items.value
        .filter((currency) => currency.characterIds.includes(characterId))
        .map((currency) => currency.name);
    },
    getCurrencyNames: () =>
      new Map<string, string>(
        collection.items.value.map(({ id, name }) => [id, name]),
      ),
  };
});
