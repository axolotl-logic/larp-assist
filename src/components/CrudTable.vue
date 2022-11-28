<template>
  <div class="q-pa-md">
    <q-table
        :rows="rows || []"
        :columns="columns"
        :loading="loading"
        row-key="id"
        binary-state-sort>
      <template v-slot:top>
        <div class="q-table__title q-mr-sm">{{ title }}</div>
        <q-btn round size="xs" color="secondary" icon="add" @click="onAdd"/>
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

<script>
export default {
  props: ['columns', 'rows', 'form', 'dialog', 'title', 'loading'],

  emits: ['refresh', 'delete'],

  data() {
    this.refresh()
    return {}
  },

  methods: {
    refresh() {
      this.$emit('refresh')
    },

    onEdit(row) {
      this.$q.dialog(this.dialog(row)).onOk(() => {
        this.$q.notify({
          type: 'positive',
          message: 'Succesfully saved!',
        })

        this.refresh()
      })
    },

    onAdd() {
      this.onEdit()
    },

    onDelete(motd) {
      this.$emit('delete', motd, () => {
        this.refresh()
        this.$q.notify({
          type: 'positive',
          message: 'Successfully deleted!',
        })
      })
    },
  }
}
</script>
