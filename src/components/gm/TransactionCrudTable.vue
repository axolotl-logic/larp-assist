<template>
  <div class="q-pa-md">
    <CrudTable
        :columns="columns"
        :rows="transactions"
        :loading="loading"
        title="Transactions"
        @add="onEdit"
        @edit="onEdit"
        @delete="onDelete"/>

    <DialogForm ref="dialog" @submit="onSubmit">
      <q-input
        outlined
        type="number"
        label="Amount"
        v-model="formData.amount"
        :rules="[$rules.required()]"/>
      <q-input
          outlined
          label="Currency"
          v-model="formData.currency"
          :rules="[$rules.required()]"/>
      <CharacterSelect label="To" v-model="formData.toUserId"/>
      <CharacterSelect label="From" v-model="formData.fromUserId"/>
      <q-input
          outlined
          type="textarea"
          label="Note"
          v-model="formData.notes"
          :rules="[$rules.required()]"/>
    </DialogForm>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed, ref, inject } from 'vue'

// Ours - stores
import { useTransactionsStore } from 'stores/transactions'

// Ours - Components
import CrudTable from 'components/common/CrudTable.vue'
import DialogForm from 'components/common/DialogForm.vue'
import CharacterSelect from 'components/common/CharacterSelect.vue'

const columns = [
  {
    name: 'toUserName',
    field: 'toUserName',
    label: 'To',
    align: 'left',
    sortable: true
  },
  {
    name: 'fromUserName',
    field: 'fromUserName',
    label: 'From',
    align: 'left',
    sortable: true
  },
  {
    name: 'amount',
    field: 'amount',
    label: 'Amount',
    align: 'left',
    sortable: true
  },
  {
    name: 'currency',
    field: 'currency',
    label: 'Currency',
    align: 'left',
    sortable: true
  },
  {
    name: 'notes',
    field: 'notes',
    label: 'Notes',
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
const onEdit = transaction => {
  formData.value = {...transaction}
  dialog.value.show()
}

const transactionsStore = useTransactionsStore()
transactionsStore.refresh()

const onDelete = transaction => transactionsStore.delete(transaction.id)
const onSubmit = () => transactionsStore.createOrUpdate(formData.value)

// Usernames provided upstream
const userNames = inject('userNames')

// The rows we're displaying. We add in the character names.
const transactions = computed(() => transactionsStore.items.map((transaction) => ({
  toUserName: userNames.value.get(transaction.toUserId),
  fromUserName: userNames.value.get(transaction.fromUserId),
  ...transaction
})))

// Determines when the loading indicator will be shown in the table
const loading = computed(() => transactionsStore.loading)
</script>
