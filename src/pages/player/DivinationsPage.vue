<template>
  <TitledCard class="q-mb-lg" title="Divinations">
    <DivinationsList v-if="divinations.length > 0" :divinations="divinations" />
    <div v-else>No MOTDs</div>
  </TitledCard>
</template>

<script setup lang="ts">
// Vue
import { computed, provide } from 'vue';

// Ours - Stores
import { useDivinationsStore } from 'stores/divinations';
import { useUserStore } from 'stores/user';

// Ours - Components
import TitledCard from 'components/common/TitledCard.vue';
import DivinationsList from 'components/player/DivinationsList.vue';

const userStore = useUserStore();

const divinationsStore = useDivinationsStore();
divinationsStore.refresh();

const divinations = computed(() =>
  divinationsStore.getCharacterDivinations(userStore.user.characterId)
);
</script>
