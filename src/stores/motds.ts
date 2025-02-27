// Pinia data store
import { defineStore } from 'pinia';

// Ours
import { Motd } from '~/models';
import { useFirestoreCollection } from '~/stores/firestore';

export const useMotdsStore = defineStore('motds', () => {
  return {
    ...useFirestoreCollection<Motd>('motds', {
      map: (id, data) => ({
        content: data.content,
        characterId: data.characterId || '',
        id: id,
      }),
    }),
  };
});
