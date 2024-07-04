<template>
  <div>
    <textarea
      v-model="model"
      class="rounded-lg px-2 text-base py-1.5 dark:bg-grey-dark-50 border border-solid border-gray-200 dark:border-grey-300 w-full"
    ></textarea>
  </div>
</template>
<script setup>
import { defineModel } from 'vue';
const model = defineModel();
</script>
