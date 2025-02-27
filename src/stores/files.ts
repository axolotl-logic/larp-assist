// Pinia data store
import { defineStore } from 'pinia';

// Ours
import { File } from '~/models';
import { useFirestoreCollection } from '~/stores/firestore';

export const useFilesStore = defineStore('files', () => {
  const collection = useFirestoreCollection<File>('files', {
    map: (id, data) => ({
      url: data.url,
      name: data.name,
      common: data.common,
      id: id,
    }),
  });

  return {
    ...collection,
    getFileNames: () =>
      new Map<string, string>(
        collection.items.value.map(({ id, name }) => [id, name]),
      ),
  };
});
