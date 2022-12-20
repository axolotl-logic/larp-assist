// Pinia data store
import { defineStore } from 'pinia';

// Vue
import { ref } from 'vue';

// Ours
import { useFirestoreCollection } from 'stores/firestore';
import { Currency } from 'src/models';

export const useCurrenciesStore = defineStore('currencies', () => {
  return {
    ...useFirestoreCollection<Currency>('currencies', {
      map: (id, data) => ({
        name: data.name,
        characterIds: data.characterIds || [],
        id: id,
      }),
    }),
    getCharacterCurrenciesNames: (characterId: string) => {
      return useCurrenciesStore()
        .items.value.filter((currency) =>
          currency.characterIds.includes(characterId)
        )
        .map((currency) => currency.name);
    },
  };
});
