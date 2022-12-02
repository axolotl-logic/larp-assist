<template>
  <div class="q-pa-md">
    <CrudTable
        :columns="columns"
        :rows="motds"
        :loading="loading"
        title="MOTDs"
        @add="onEdit"
        @edit="onEdit"
        @delete="onDelete"/>

    <DialogForm ref="dialog" @submit="onSubmit">
      <q-input
          outlined
          type="textarea"
          label="Content"
          v-model="formData.content"
          :autofocus="true"
          :rules="[$rules.required()]"/>
      <CharacterSelect label="Character" v-model="formData.userId" />
    </DialogForm>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed, ref, inject } from 'vue'

// Ours - stores
import { useMotdsStore } from 'stores/motds'

// Ours - Components
import CrudTable from 'components/common/CrudTable.vue'
import DialogForm from 'components/common/DialogForm.vue'
import CharacterSelect from 'components/common/CharacterSelect.vue'

const columns = [
  {
    name: 'content',
    field: 'content',
    label: 'Content',
    required: true,
    align: 'left',
    sortable: true
  },
  {
    name: 'userName',
    required: false,
    label: 'Character',
    align: 'left',
    field: 'userName',
    sortable: true
  },
  { name: 'actions', label: 'Action' }
]

// The data backing the form
const formData = ref()

// The form dialog for editing/creating
const dialog = ref(null)

// The callback when you click edit or add
const onEdit = motd => {
  formData.value = {...motd}
  dialog.value.show()
}

const motdsStore = useMotdsStore()
motdsStore.refresh()

const onDelete = motd => motdsStore.delete(motd.id)
const onSubmit = () => motdsStore.createOrUpdate(formData.value)

// Usernames provided upstream
const userNames = inject('userNames')

// The rows we're displaying. We add in the character names.
const motds = computed(() => motdsStore.items.map((motd) => ({
  userName: userNames.value.get(motd.userId),
  ...motd
})))

// Determines when the loading indicator will be shown in the table
const loading = computed(() => motdsStore.loading)
</script>
