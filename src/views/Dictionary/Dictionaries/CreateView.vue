<template>
  <breadcrumbs :breadcrumbs="breadcrumbsData" />
  <div>Dictionaries Create</div>
  <form @submit="onSubmit" class="flex flex-col justify-start gap-4">
    <!-- <AppTabs :aciveTab="aciveTab" @changeActiveTab="(e) => (aciveTab = e)" /> -->
    <AppPlainInput name="example" type="text" v-model="text" />
    <AppFileInput v-model="img" />
    <AppSelectInput :options="options" v-model="option" />
    <AppTextarea v-model="sentence" />
    <AppToggleInput v-model="isShow" />
    <AppWysiwyg v-model="wysiwyg" />
  </form>
</template>
<script setup>
import AppPlainInput from '@/components/atoms/inputs/form/AppPlainInput.vue';
import AppFileInput from '@/components/atoms/inputs/form/AppFileInput.vue';
import AppSelectInput from '@/components/atoms/inputs/form/AppSelectInput.vue';
import AppTextarea from '@/components/atoms/inputs/form/AppTextarea.vue';
// import AppTabs from '@/components/atoms/buttons/AppTabs.vue';

import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { reactive, ref } from 'vue';
import AppToggleInput from '@/components/atoms/inputs/form/AppToggleInput.vue';
import AppWysiwyg from '@/components/atoms/inputs/form/AppWysiwyg.vue';

// #TODO: Just an example. Feel free to remove in future
const text = ref('123');
const img = ref('');
const option = ref('test2');
const sentence = ref('This is sentence example for text area');
const wysiwyg = ref('<h1>Hello World!</h1>');
const isShow = ref(false);

const options = ref([
  {
    label: 'test1',
    key: 'test1',
  },
  {
    label: 'test2',
    key: 'test2',
  },
  {
    label: 'test3',
    key: 'test3',
  },
]);

// const aciveTab = ref('uk');

const breadcrumbsData = reactive([
  {
    title: 'Dictionaries',
    link: { name: 'DictionariesList' },
  },
  {
    title: 'Create',
    link: { name: 'DictionariesCreate' },
  },
]);

const { handleSubmit } = useForm({
  initialValues: {
    example: 'example',
  },
  validationSchema: yup.object({
    example: yup.string().required('Example required! Love this validation :)'),
  }),
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

// export default {
//   name: 'CreateView',
//   data() {
//     return {
//       breadcrumbs: [
//         {
//           title: 'Dictionaries',
//           link: { name: 'DictionariesList' },
//         },
//         {
//           title: 'Create',
//           link: { name: 'DictionariesCreate' },
//         },
//       ],
//     };
//   },
//   components: { AppPlainInput },
// };
</script>
