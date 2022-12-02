<template>
  <div class="q-pa-md">
    <CrudTable
        :columns="columns"
        :rows="divinations"
        :loading="loading"
        title="Divinations"
        @add="onEdit"
        @edit="onEdit"
        @delete="onDelete"/>

    <DialogForm ref="dialog" @submit="onSubmit">
      <q-input
          outlined
          label="Name"
          v-model="formData.name"
          :rules="[$rules.required()]"/>
      <q-input
          outlined
          type="textarea"
          label="Content"
          v-model="formData.content"
          :rules="[$rules.required()]"/>
      <CharacterSelect
          v-model="formData.userId"
          label="Character" />
    </DialogForm>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed, ref, inject } from 'vue'

// Ours - stores
import { useDivinationsStore } from 'stores/divinations'

// Ours - Components
import CrudTable from 'components/common/CrudTable.vue'
import DialogForm from 'components/common/DialogForm.vue'
import CharacterSelect from 'components/common/CharacterSelect.vue'

const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Name',
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
  {
    name: 'content',
    field: 'content',
    label: 'Content',
    required: true,
    align: 'left',
    sortable: true
  },
  { name: 'actions', label: 'Action' }
]

// The data backing the form
const formData = ref()

// The form dialog for editing/creating
const dialog = ref(null)

// The callback when you click edit or add
const onEdit = divination => {
  formData.value = {...divination}
  dialog.value.show()
}

const divinationsStore = useDivinationsStore()
divinationsStore.refresh()

const onDelete = divination => divinationsStore.delete(divination.id)
const onSubmit = () => divinationsStore.createOrUpdate(formData.value)

// Usernames provided upstream
const userNames = inject('userNames')

// The rows we're displaying. We add in the character names.
const divinations = computed(() => divinationsStore.items.map((divination) => ({
  userName: userNames.value.get(divination.userId),
  ...divination
})))

// Determines when the loading indicator will be shown in the table
const loading = computed(() => divinationsStore.loading)
</script>
