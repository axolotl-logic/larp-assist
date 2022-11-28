<template>
  <DialogForm @ok="save">
    <q-input
        outlined
        label="name"
        v-model="formData.name"
        :rules="[required]"/>

    <q-select
        clearable
        filled
        map-options
        multiple
        use-chips
        stack-label
        emit-value
        v-model="formData.userIds"
        :options="userNameOptions"
        label="Users" />
  </DialogForm>
</template>

<script lang="ts">
// Vue
import { ref } from 'vue'

// Ours
import { useMarketsStore } from 'stores/markets'
import DialogForm from 'components/DialogForm.vue'

const marketsStore = useMarketsStore()

export default {
  components: { DialogForm },

  props: [ 'market', 'userNames' ],

  emits: [ 'ok' ],

  methods: {
    required (val) {
      return !!val || 'Field is required'
    },

    save() {
      if (this.market.id) {
        marketsStore.update(this.market.id, this.formData)
      } else {
        marketsStore.create(this.formData)
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

      return userNameOptions
    }
  },

  data() {
    return {
      formData: ref({
        name: this.market.name || '',
        userIds: this.market.userIds || [],
      }),
    }
  }
}
</script>
