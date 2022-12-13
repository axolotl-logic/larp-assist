// Pinia data store
import { defineStore } from 'pinia';

// Ours
import { useFirestoreCollection } from 'stores/firestore';
import { Character } from 'src/models';

export const useCharactersStore = defineStore('characters', () => {
  const collection = useFirestoreCollection<Character>('characters', {
    map: (id, data) => ({
      notes: data.notes,
      name: data.name,
      id: id,
    }),
  });

  return {
    ...collection,
    getCharacterNames: () =>
      new Map<string, string>(
        collection.items.value.map(({ id, name }) => [id, name])
      ),
  };
});
