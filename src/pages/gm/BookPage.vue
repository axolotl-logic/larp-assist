<template>
  <div class="text-h6">
    {{ book.name }}
  </div>
  <SectionCrudTable :bookId="book.id" />
  <TrapCrudTable/>
  <div class="text-h6">
    Preview
  </div>
  <BookReader :chapters="chapters"/>
</template>

<script setup lang="ts">
// Vue
import { computed, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// Ours - Components
import SectionCrudTable from 'components/gm/SectionCrudTable.vue'
import TrapCrudTable from 'components/gm/TrapCrudTable.vue'
import BookReader from 'components/common/BookReader.vue'

// Ours - Store
import { useTrapsStore } from 'stores/traps'
import { useBooksStore } from 'stores/books'
import { useSectionsStore } from 'stores/sections'

// Ours - model
import { groupSectionsByChapter } from 'src/models'

const route = useRoute()

const booksStore = useBooksStore()
await booksStore.refresh()
const book = booksStore.itemsById.get(route.params.id)

const sectionsStore = useSectionsStore()
sectionsStore.refresh()
const sections = computed(() => sectionsStore.sectionsByBookId.get(book.id))

const chapters = ref([])
watch(sections, (latest) => {
  if (latest) {
    console.log("whee")
    chapters.value = groupSectionsByChapter(latest)
  }
})


const trapsStore = useTrapsStore()
await trapsStore.refresh()
provide('trapsById', computed(() => trapsStore.itemsById))
</script>
