<template>
  <div class="q-pa-md">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
          v-for="(chapter, chapterIdx) in chapters"
          v-bind:key="hashChapter(chapter)"
          switch-toggle-side
          expand-separator
          group
          :label="'Chapter ' + (chapterIdx + 1)">
        <q-expansion-item
            v-for="(section, sectionIdx) in chapter"
            v-bind:key="section.id"
            :header-inset-level="1"
            switch-toggle-side
            expand-separator
            :label="'Section ' + (sectionIdx + 1)" >
            <q-card>
              <q-card-section>
                {{ section }}
              </q-card-section>
            </q-card>
        </q-expansion-item>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue'

// Ours - Store
import { useBooksStore } from 'src/stores/books'

// Ours - Model
import { hashChapter } from 'src/models/books'

const props = defineProps(['bookId'])

const chapters = ref([])
const booksStore = useBooksStore()
booksStore.getChapters(props.bookId).then((fetchedChapters) => chapters.value = fetchedChapters)
</script>
