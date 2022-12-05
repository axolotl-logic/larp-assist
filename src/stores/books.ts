// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions } from 'stores/firestore'
import { Book } from 'src/models'

export const useBooksStore = defineStore('books', () => {
  return {
    ...makeCrudActions<Book>('books', {
      map: (id, data) => ({
        name: data.name,
        author: data.author,
        location: data.location,
        code: data.code,
        description: data.description,
        chapters: data.chapters || [],
        id: id,
      })
    })
  }
})
