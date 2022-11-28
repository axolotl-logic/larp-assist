<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-form class="full-width">
          <q-input
              outlined
              type="textarea"
              label="Content"
              v-model="formData.content"
              :rules="[required]"/>
          <q-select
              clearable
              filled
              map-options
              emit-value
              v-model="formData.userId"
              :options="userNameOptions"
              label="Character" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
// Vue
import { ref } from 'vue'

// Ours
import { useMotdsStore } from 'stores/motds'

const motdsStore = useMotdsStore()

export default {
  props: [ 'motd', 'userNames' ],

  emits: [ 'ok', 'hide' ],

  methods: {
    required (val) {
      return !!val || 'Field is required'
    },

    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      this.$emit('hide')
    },

    onCancelClick() {
      this.hide()
    },

    onOKClick () {
      if (this.motd.id) {
        motdsStore.update(this.motd.id, this.formData)
     } else {
        motdsStore.create(this.formData)
      }

      this.$emit('ok')

      this.hide()
    },
  },

  computed: {
    userNameOptions() {
      const userNameOptions = []
      this.userNames.forEach((name, userId) =>
        userNameOptions.push({
          label: name,
          value: userId
        })
      )

      console.log(userNameOptions)

      return userNameOptions
    }
  },

  data() {
    return {
      formData: ref({
        content: this.motd.content || '',
        userId: this.motd.userId || '',
      }),
    }
  }
}
</script>
