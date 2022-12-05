// Vue
import { ref, Ref } from 'vue'

// Pinia data store
import { defineStore } from 'pinia'

// Ours
import { makeCrudActions } from 'stores/firestore'
import { Section } from 'src/models'

export const useSectionsStore = defineStore('sections', () => {
  const sectionsByBookId = ref(new Map<string, Array<Section>>)
  
  return {
    sectionsByBookId,
    ...makeCrudActions<Section>('sections', {
      refresh: () => {
        sectionsByBookId.value = new Map()
      },
      map: (id, data) => {
        const section = {
          sectionIdx: data.sectionIdx,
          chapterIdx: data.chapterIdx,
          bookId: data.bookId,
          trapId: data.trapId,
          text: data.text,
          type: data.type,
          id: id,
        }
        
        const siblings = sectionsByBookId.value.get(data.bookId) || []
        sectionsByBookId.value.set(data.bookId, siblings.concat(section))
        
        return section
      }
    })
  }
})
