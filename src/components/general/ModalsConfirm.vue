<template>
  <div class="modal">
    <div class="modal__bck z-1" @click="$emit('close')" />
    <div class="modal__block py-5 px-7 rounded z-2">
      <h2 class="dark:text-slate-800 text-xl pb-3">Confirm</h2>
      <span class="modal__close" @click="$emit('close')" />
      <div class="modal__content">
        <p class="text-center dark:text-gray-800 mb-5">
          {{ confirmText }}
        </p>
        <div class="my-3 flex justify-between items-center">
          <input
            type="button"
            value="Cancel"
            class="w-full rounded-lg text-base px-3 py-1.5 bg-red-400 dark:bg-red-500 text-emerald-100 cursor-pointer hover:text-emerald-200 mr-5"
            @click="() => $emit('confirmStatus', false)"
          />

          <input
            type="button"
            value="Confirm"
            class="w-full rounded-lg text-base px-3 py-1.5 bg-green-500 dark:bg-green-600 text-emerald-100 cursor-pointer hover:text-emerald-200 ml-5"
            @click="() => $emit('confirmStatus', true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    confirmText: {
      default: 'You confirm this ?',
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped></style>
