<template>
  <div class="q-pa-md">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
          v-for="(chapter, chapterIdx) in chapters"
          v-bind:key="hashChapter(chapter)"
          expand-separator
          :label="'Chapter ' + (chapterIdx + 1)">
        <q-expansion-item
            v-for="(section, sectionIdx) in chapter"
            v-bind:key="section.id"
            :header-inset-level="1"
            expand-separator
            :label="'Section ' + (sectionIdx + 1)" >
            <q-card>
              <q-card-section>
                {{ displayText(section) }}
              </q-card-section>
            </q-card>
        </q-expansion-item>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
// Vue
import { inject } from 'vue'

// Ours - model
import { SectionType, hashChapter } from 'src/models'

defineProps(['chapters'])

// TODO: DRY this up
const trapsById = inject('trapsById')
const displayText = (section: Section) => {
  if (section.type == SectionType.Trap) {
    return trapsById.value.get(section.trapId).content
  }

  return section.text
}
</script>
