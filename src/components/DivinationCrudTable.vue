<template>
  <div class="q-pa-md">
    <CrudTable
        :columns="columns"
        :rows="divinations"
        :dialog="dialog"
        :loading="loading"
        title="Divinations"
        @refresh="fetchDivinations"
        @delete="deleteDivination" />
  </div>
</template>

<script>
// Vue
import { ref } from 'vue'

// Ours
import { useDivinationsStore } from 'stores/divinations'
import { useUserStore } from 'stores/user'
import DivinationDialogForm from 'components/DivinationDialogForm.vue'
import CrudTable from 'components/CrudTable.vue'

const divinationsStore = useDivinationsStore()
const userStore = useUserStore()

export default {
  components: { CrudTable },

  computed: {
    userNames() {
      return userStore.userNames
    }
  },

  setup() {
    return {
      loading: ref(true),
      divinations: ref(),
      columns: [
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
    }
  },

  methods: {
    dialog(divination) {
      return {
        component: DivinationDialogForm,
        componentProps: {
          divination: divination || {},
          userNames: this.userNames
        }
      }
    },

    deleteDivination(divination, onSuccess) {
      this.loading = true

      divinationsStore.delete(divination.id).then(() => {
        onSuccess()

        this.loading = false
      })
    },

    fetchDivinations() {
      this.loading = true
      return divinationsStore.fetch().then(divinations => {
        userStore.fetchUserNames().then(userNames => {
          divinations.forEach(divination => {
            divination.userName = userNames.get(divination.userId, '')
          })

          this.divinations = divinations
          this.loading = false
        })
      })
    },
  }
}
</script>
