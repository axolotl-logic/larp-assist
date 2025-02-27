<template>
  <QForm @submit.prevent="download">
    <QInput
      v-model="fileCode"
      label="File Code"
      filled
      clearable
      :rules="[$rules.required()]"
    />
    <QBtn
      type="submit"
      color="primary"
      label="Download"
      icon="cloud_download"
    />
  </QForm>
</template>

<script setup lang="ts">
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from 'firebase/storage';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();
const fileCode = ref('');

const download = () => {
  const storage = getStorage();
  const fileRef = storageRef(storage, 'public').child(fileCode.value + '.pdf');
  getDownloadURL(fileRef)
    .then((url: string) => {
      console.log(url);
    })
    .catch((error) => {
      const messages = new Map([
        ['storage/object-not-found', 'File not found'],
        ['storage/unauthorized', 'Unauthorized'],
        ['storage/canceled', 'Canceled'],
        ['storage/unknown', 'Unknown error'],
      ]);

      let msg = messages.get(error.code) || error.code;
      $q.notify({
        type: 'negative',
        message: msg,
        icon: 'nocloud_download',
      });
    });
};
</script>
