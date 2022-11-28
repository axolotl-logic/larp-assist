<template>
  <DialogForm @ok="save">
    <q-input
        outlined
        label="Name"
        v-model="formData.name"
        :rules="[required]"/>
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
import { useDivinationsStore } from 'stores/divinations'
import DialogForm from 'components/DialogForm.vue'

const divinationsStore = useDivinationsStore()

export default {
  components: { DialogForm },

  props: [ 'divination', 'userNames' ],

  emits: [ 'ok' ],

  methods: {
    required (val) {
      return !!val || 'Field is required'
    },

    save() {
      if (this.divination.id) {
        divinationsStore.update(this.divination.id, this.formData)
      } else {
        divinationsStore.create(this.formData)
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
        content: this.divination.content || '',
        userId: this.divination.userId || '',
      }),
    }
  }
}
</script>
