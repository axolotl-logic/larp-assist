// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions } from 'stores/firestore'
import { useSectionsStore } from 'stores/sections'
import { Book, SectionType, groupSectionsByChapter } from 'src/models/books'

export const useBooksStore = defineStore('books', () => {
  return {
    getChapters: (bookId: string): Promise<string[][]> => {
      const sectionsStore = useSectionsStore()
      const trapsStore = useSectionsStore()
      return Promise.all([
        sectionsStore.getSectionsByBookId(bookId),
        trapsStore.refresh(),
      ]).then(([v,]) => groupSectionsByChapter(v)).then(chapters => {
        return chapters.map(sections => {
          return sections.map(section => {
            if (section.type == SectionType.Trap) {
              const trap = trapsStore.itemsById.get(section.trapId)
              if (trap) {
                return trap.text
              }

              return ''
            }
            
            return section.text
          })
        })
      })
    },
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
