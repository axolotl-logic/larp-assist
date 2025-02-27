<template>
  <TitledCard class="q-mb-lg" title="Missives">
    <MotdsList v-if="motds.length > 0" :motds="motds" />
    <div v-else>No MOTDs</div>
  </TitledCard>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue';

// Ours - Stores
import { useMotdsStore } from 'stores/motds';
import { useUserStore } from 'stores/user';

// Ours - Components
import TitledCard from 'components/common/TitledCard.vue';
import MotdsList from 'components/player/MotdsList.vue';

const motdsStore = useMotdsStore();
motdsStore.refresh();

const userStore = useUserStore();

const motds = computed(() =>
  motdsStore.items.filter(
    (motd) => motd.characterId === userStore.user.characterId,
  ),
);
</script>
