<template>
  <DialogForm @ok="save">
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
  </DialogForm>
</template>

<script lang="ts">
// Vue
import { ref } from 'vue'

// Ours
import { useMotdsStore } from 'stores/motds'
import DialogForm from 'components/DialogForm.vue'

const motdsStore = useMotdsStore()

export default {
  components: { DialogForm },

  props: [ 'motd', 'userNames' ],

  emits: [ 'ok' ],

  methods: {
    required (val) {
      return !!val || 'Field is required'
    },

    save() {
      if (this.motd.id) {
        motdsStore.update(this.motd.id, this.formData)
      } else {
        motdsStore.create(this.formData)
      }

      this.$emit('ok')
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
