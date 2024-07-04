<template>
  <div class="flex justify-center gap-1 self-start items-center">
    <span
      class="text-gray-950"
      :class="[
        !modelValue ? 'opacity-100' : 'opacity-80',
        blackTheme ? 'dark:text-gray-950' : 'dark:text-white',
      ]"
      >{{ disabledText }}</span
    >
    <div
      :class="
        modelValue ? 'bg-primary-300 dark:bg-primary-dark-300' : 'bg-gray-300 dark:bg-grey-400'
      "
      @click="toggle"
      class="w-10 transition-all duration-500 h-5 flex items-center rounded-full px-[2px] cursor-pointer"
    >
      <div
        :class="{ 'translate-x-5': modelValue }"
        class="w-4 h-4 transition-all duration-300 transform bg-white rounded-full shadow-md"
      ></div>
    </div>
    <span
      class="text-gray-950 dark:text-white"
      :class="[
        modelValue ? 'opacity-100' : 'opacity-80',
        blackTheme ? 'dark:text-gray-950' : 'dark:text-white',
      ]"
      >{{ enabledText }}</span
    >
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  disabledText: {
    type: String,
    default: 'False',
  },
  enabledText: {
    type: String,
    default: 'True',
  },
  blackTheme: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

function toggle() {
  emit('update:modelValue', !props.modelValue);
}
</script>

<style scoped></style>
