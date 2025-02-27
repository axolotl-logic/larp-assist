// Pinia data store
import { defineStore } from 'pinia';

// Ours
import { Trap } from '~/models';
import { useFirestoreCollection } from '~/stores/firestore';

export const useTrapsStore = defineStore('traps', () => {
  return {
    ...useFirestoreCollection<Trap>('traps', {
      map: (id, data) => ({
        name: data.name,
        content: data.content,
        id: id,
      }),
    }),
  };
});
