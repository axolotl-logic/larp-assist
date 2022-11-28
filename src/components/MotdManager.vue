<template>
  <div class="q-pa-md">
    <CrudTable
        :columns="columns"
        :rows="motds"
        :dialog="dialog"
        :loading="loading"
        title="MOTDs"
        @refresh="fetchMotds"
        @delete="deleteMotd" />
  </div>
</template>

<script>
// Vue
import { ref } from 'vue'

// Ours
import { useMotdsStore } from 'stores/motds'
import { useUserStore } from 'stores/user'
import MotdFormDialog from 'components/MotdForm.vue'
import CrudTable from 'components/CrudTable.vue'

const motdsStore = useMotdsStore()
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
      motds: ref(),
      columns: [
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
    }
  },

  methods: {
    dialog(motd) {
      return {
        component: MotdFormDialog,
        componentProps: {
          motd: motd || {},
          userNames: this.userNames
        }
      }
    },

    deleteMotd(motd, onSuccess) {
      this.loading = true

      motdsStore.delete(motd.id).then(() => {
        onSuccess()

        this.loading = false
      })
    },

    fetchMotds() {
      this.loading = true
      return motdsStore.fetch().then(motds => {
        userStore.fetchUserNames().then(userNames => {
          motds.forEach(motd => {
            motd.userName = userNames.get(motd.userId, '')
          })

          this.motds = motds
          this.loading = false
        })
      })
    },
  }
}
</script>
