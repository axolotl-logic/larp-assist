<template>
  <div class="q-pa-md">
    <q-table
        :rows="rows || []"
        :columns="columns"
        :loading="loading"
        row-key="id"
        binary-state-sort>
      <template v-slot:top>
        <q-btn round size="xs" class="q-mr-sm" color="secondary" icon="add" @click="onAdd"/>
        <div class="q-table__title">{{ title }}</div>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="mode_edit" @click="onEdit(props.row)"></q-btn>
          <q-btn icon="delete" @click="onDelete(props.row)"></q-btn>
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const props = defineProps(['columns', 'rows', 'title', 'loading'])
const emit = defineEmits(['delete', 'edit'])

const onEdit = (row) => emit('edit', row)
const onDelete = (row) => emit('delete', row)
const onAdd = onEdit
</script>
