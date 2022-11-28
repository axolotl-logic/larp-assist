<template>
  <q-page padding>
    {{ name }}
    <MotdsList :motds="motds"/>
    <DivinationsList :divinations="divinations"/>
  </q-page>
</template>

<script lang="ts">
// Vue
import { defineComponent, computed } from 'vue'

// Ours
import { useUserStore } from 'stores/user'
import { useMotdsStore } from 'stores/motds'
import { useDivinationsStore } from 'stores/divinations'
import MotdsList from 'components/MotdsList.vue'
import DivinationsList from 'components/DivinationsList.vue'

export default defineComponent({
  components: {MotdsList, DivinationsList},
  setup() {
    const userStore = useUserStore()
    const motdsStore = useMotdsStore()
    const divinationsStore = useDivinationsStore()

    motdsStore.fetch()
    divinationsStore.fetch()

    return {
      name: computed(() => userStore.user.name),
      motds: computed(() => motdsStore.motds),
      divinations: computed(() => divinationsStore.divinations),
    }
  },
})
</script>
