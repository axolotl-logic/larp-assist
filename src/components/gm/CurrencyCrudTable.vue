<template>
  <div class="q-pa-md">
    <CrudTable
        :columns="columns"
        :rows="currencies"
        :loading="loading"
        title="Currencies"
        @add="onEdit"
        @edit="onEdit"
        @delete="onDelete"/>

    <DialogForm ref="dialog" @submit="onSubmit">
      <q-input
          outlined
          label="name"
          v-model="formData.name"
          :rules="[$rules.required()]"/>

      <CharacterMultiSelect
          label="Characters"
          v-model="formData.userIds"/>
    </DialogForm>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed, ref, inject } from 'vue'

// Ours - stores
import { useCurrenciesStore } from 'stores/currencies'

// Ours - Components
import CrudTable from 'components/common/CrudTable.vue'
import DialogForm from 'components/common/DialogForm.vue'
import CharacterMultiSelect from 'components/common/CharacterMultiSelect.vue'

const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left',
    sortable: true
  },
  {
    name: 'userNames',
    field: 'userNames',
    label: 'Characters',
    format: (userNames) => userNames.join(', '),
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
const onEdit = currency => {
  formData.value = {...currency}
  dialog.value.show()
}

const currenciesStore = useCurrenciesStore()
currenciesStore.refresh()

const onDelete = currency => currenciesStore.delete(currency.id)
const onSubmit = () => currenciesStore.createOrUpdate(formData.value)

// Usernames provided upstream
const userNames = inject('userNames')

// The rows we're displaying. We add in the character names.
const currencies = computed(() => currenciesStore.items.map((currency) => ({
  userNames: (currency.userIds || []).map(id => userNames.value.get(id)),
  ...currency
})))

// Determines when the loading indicator will be shown in the table
const loading = computed(() => currenciesStore.loading)
</script>
