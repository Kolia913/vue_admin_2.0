<template>
  <div class="flex bg-slate-200 dark:bg-slate-800 rounded font-bold">
    <template v-for="tab in props.tabs" :key="`tab_${tab.id}`">
      <div
        class="border-b-2 border-solid px-10 py-3 mx-1 cursor-pointer"
        :class="tab.id === props.aciveTab ? 'border-white' : 'border-b-transparent'"
        @click="$emit('changeActiveTab', tab.id)"
      >
        {{ tab.name }}
      </div>
    </template>
  </div>
</template>
<script setup>
const props = defineProps({
  tabs: {
    default: [
      {
        id: 'default',
        name: 'Default',
      },
    ],
  },
  aciveTab: {
    type: String,
    default: 'default',
  },
});
</script>
