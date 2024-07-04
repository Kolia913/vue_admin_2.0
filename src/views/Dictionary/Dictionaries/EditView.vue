<template>
  <breadcrumbs :breadcrumbs="breadcrumbs" />
  <div>Dictionaries Edit</div>
</template>
<script>
export default {
  name: 'EditView',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Dictionaries',
          link: { name: 'DictionariesList' },
        },
        {
          title: this.$route.params.slug,
          link: { name: 'DictionariesEdit', params: { slug: this.$route.params.slug } },
        },
        {
          title: 'Edit',
          link: { name: 'DictionariesEdit', params: { slug: this.$route.params.slug } },
        },
      ],
    };
  },
};
</script>
