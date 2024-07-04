<template>
  <div>
    <input
      v-model="model"
      class="rounded-lg px-2 text-base py-1.5 dark:bg-grey-dark-50 border border-solid border-gray-200 dark:border-grey-300 w-full"
      :type="type ? type : 'text'"
    />
  </div>
</template>
<script setup>
import { defineModel } from 'vue';

defineProps(['type']);

const model = defineModel();
</script>
