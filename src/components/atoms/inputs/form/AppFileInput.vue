<template>
  <label>
    <div class="flex w-full">
      <input
        class="rounded-lg px-2 text-base py-1.5 dark:bg-grey-dark-50 border border-solid border-gray-200 dark:border-grey-300 w-full"
        type="text"
        v-model="model"
      />
      <button
        class="border border-slate-700 bg-slate-700 text-slate-100 rounded text-sm py-0.5 ml-2"
        @click="choiceNewImg()"
      >
        choice img
      </button>
      <ModalFilemanager
        v-if="toggleShowFileManager"
        @close="() => (toggleShowFileManager = false)"
        @sendPath="(e) => getPath(e)"
        :modalStatus="true"
      />
    </div>
    <img v-if="model" :src="Config.baseStorage + model" class="max-w-40 mt-2" />
  </label>
</template>
<script setup>
// #TODO: Replace with new standard
import Config from '@/core/_internal/Config';
import ModalFilemanager from '@/components/partials/FileManager/ModalFilemanager.vue';
import { ref, defineModel } from 'vue';

const model = defineModel();

const toggleShowFileManager = ref(false);

const choiceNewImg = () => {
  toggleShowFileManager.value = true;
};
const getPath = (e) => {
  model.value = e;
};
</script>
