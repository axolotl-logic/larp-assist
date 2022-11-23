<template>
  <div class="q-pa-md">
    {{ motds }}
    <q-table
      title="MOTDs"
      :rows="motds"
      :columns="columns"
      row-key="id"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="content" :props="props" class="cursor-pointer">
            {{ props.row.content }}
            <q-popup-edit
                v-model="props.row.content"
                v-slot="scope"
                persistant
                buttons
                @save="content => saveContent(props.row.id, content)"
                :validate="v => v.length > 0"
                >
              <q-input
                  type="textarea"
                  v-model="scope.value"
                  autofocus
                  :rules="[v => scope.validate(scope.value) || 'Field required']"
                  />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
// Vue
import { ref } from 'vue'

// Ours
import { useMotdsStore } from 'stores/motds'

const columns = [
  {
    name: 'content',
    required: true,
    label: 'Content',
    align: 'left',
    field: 'content',
    sortable: true
  },
]

const motdsStore = useMotdsStore()

export default {
  setup() {
    return {
      columns: columns
    }
  },

  data() {
    this.fetchMotds()

    return {
      motds: ref([]),
    }
  },

  methods: {
    fetchMotds() {
      motdsStore.fetchMotds()
        .then(motds => this.motds = motds)
        .catch(err => this.$q.notify({
          type: 'negative',
          message: err.message
        }))
    },
    saveContent(id, content) {
      motdsStore.saveContent(id, content).catch((err) => {
        this.$q.notify({type: 'negative', message: err.message})
        motdsStore.fetchMotds().then(motds => this.motds = motds)
      })
    }
  }
}
</script>
