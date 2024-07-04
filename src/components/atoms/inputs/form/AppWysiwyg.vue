<template>
  <div class="rounded-lg overflow-hidden">
    <editor
      height="500"
      v-model="value"
      class="w-full h-full"
      api-key="1ox598xe1kodulc0yj8a1tzqkwm7mca1sms022pdgd9fyc3l"
      :init="{
        plugins:
          'lists link image emoticons table code media anchor wordcount nonbreaking quickbars',
        toolbar:
          'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image table anchor | code media wordcount nonbreaking quickbars',
      }"
      :a11y_advanced_options="true"
      :resize_img_proportional="true"
      :style_formats="[
        {
          title: 'Image Left',
          selector: 'img',
          styles: {
            float: 'left',
            margin: '50px',
          },
        },
        {
          title: 'Image Right',
          selector: 'img',
          styles: {
            float: 'right',
            margin: '50px',
          },
        },
      ]"
    />
    <button
      class="w-full border border-slate-700 bg-slate-700 text-slate-100 rounded text-sm py-0."
      @click="choiceNewImg()"
    >
      choice img
    </button>
    <ModalFilemanager
      v-if="toggleShowFileManager"
      @close="() => (toggleShowFileManager = false)"
      :modalStatus="true"
    />
  </div>
</template>
<script setup>
import ModalFilemanager from '@/components/partials/FileManager/ModalFilemanager.vue';
import { ref, defineModel } from 'vue';
import Editor from '@tinymce/tinymce-vue';

const value = defineModel();

const toggleShowFileManager = ref(false);

const choiceNewImg = () => {
  toggleShowFileManager.value = true;
};

// export default {
//   components: {
//     editor: Editor,
//   },
//   props: {
//     dataHtml: {
//       type: String,
//       default: '',
//     },
//   },
//   watch: {
//     dataHtml(e) {
//       this.value = e;
//     },
//     value(e) {
//       this.$emit('changeData', e);
//     },
//   },
//   data() {
//     return {
//       value: '',
//     };
//   },
//   created() {
//     this.value = this.dataHtml;
//   },
// };
</script>
