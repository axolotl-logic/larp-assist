<template>
  <q-page padding>
    {{ name }}
    <MotdList :motds="motds"/>
  </q-page>
</template>

<script lang="ts">
// Vue
import { defineComponent, computed } from 'vue'

// Ours
import { useUserStore } from 'stores/user'
import { useMotdsStore } from 'stores/motds'
import MotdList from 'components/MotdList.vue'

export default defineComponent({
  components: {MotdList},
  setup() {
    const userStore = useUserStore()
    const motdsStore = useMotdsStore()

    motdsStore.fetchMotds()

    return {
      name: computed(() => userStore.user.name),
      motds: computed(() => motdsStore.motds)
    }
  },
})
</script>
