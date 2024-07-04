<template>
  <breadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="pt-2">
    <page-title text="Dictionaries" />
  </div>
  <div class="w-full flex flex-row justify-end items-center">
    <AppButton
      text="Create"
      variant="primary"
      class="w-24"
      @on-click="$router.push('/dictionaries/create')"
    />
  </div>
  <div class="flex flex-col gap-y-8 mt-4">
    <AppTable
      name="dict"
      :columns="columns"
      :data="tableData"
      :options="options"
      dataPrimaryKey="id"
      @on-sort="onSortItems"
      @on-edit="onEditItem"
      @on-view="onViewItem"
      @on-delete="onDeleteItem"
      @on-bulk="onBulk"
    >
      <template #id="{ item }">
        <span>{{ item.id }}</span>
      </template>
      <template #word="{ item }">
        <span>{{ item.word }}</span>
      </template>
      <template #meaning="{ item }">
        <span>{{ item.meaning }}</span>
      </template>
      <template #created_at="{ item }">
        <span>{{ item.created_at }}</span>
      </template>
      <template #updated_at="{ item }">
        <span>{{ item.updated_at ? item.updated_at : '-' }}</span>
      </template>
    </AppTable>
  </div>
</template>
<script>
import AppTable from '@/components/general/AppTable.vue';
import dayjs from 'dayjs';
import AppButton from '@/components/atoms/buttons/AppButton.vue';

export default {
  name: 'ListView',
  components: { AppTable, AppButton },
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Dictionaries',
          link: { name: 'DictionariesList' },
        },
        {
          title: 'List',
          link: { name: 'DictionariesList' },
        },
      ],
      columns: [
        {
          key: 'id',
          title: 'ID',
          editable: false,
        },
        {
          key: 'word',
          title: 'Word',
          editable: false,
        },
        {
          key: 'meaning',
          title: 'Meaning',
          editable: true,
        },
        {
          key: 'created_at',
          title: 'Created At',
          sortable: true,
          sortorder: 'desc',
          editable: true,
        },
        {
          key: 'updated_at',
          title: 'Updated At',
          editable: true,
        },
      ],
      tableData: [
        {
          id: 1,
          word: 'Student',
          meaning: 'Студент',
          created_at: '2023-08-13',
          updated_at: null,
        },
        {
          id: 2,
          word: 'Schuler',
          meaning: 'Учень',
          created_at: '2023-08-11',
          updated_at: '2023-08-23',
        },
        {
          id: 3,
          word: 'Arbeit',
          meaning: 'Робота',
          created_at: '2023-08-12',
          updated_at: null,
        },
        {
          id: 4,
          word: 'Mutter',
          meaning: 'Мама',
          created_at: '2023-08-17',
          updated_at: '2023-08-26',
        },
        {
          id: 5,
          word: 'Trinken',
          meaning: 'Пити',
          created_at: '2023-08-10',
          updated_at: null,
        },
      ],
      options: {
        mainCol: 'meaning',
        searchbar: true,
        selectable: true,
        paginated: true,
        pagination: {
          current_page: 3,
          last_page: 10,
          per_page: 5,
          total: 50,
          from: 1,
          to: 5,
        },
        itemsAlignment: 'start',
        actions: ['edit', 'delete'],
      },
    };
  },
  methods: {
    onViewItem(id) {
      console.log('view', id);
    },
    onEditItem(id) {
      console.log('edit', id);
    },
    onDeleteItem(id) {
      console.log('delete', id);
    },
    onSortItems(key, order) {
      this.columns = this.columns.map((item) => {
        if (item.key === key) {
          return { ...item, sortorder: order };
        } else {
          return item;
        }
      });
      this.tableData = this.tableData.sort((a, b) => {
        const dateA = dayjs(a[key], 'YYYY-MM-DD');
        const dateB = dayjs(b[key], 'YYYY-MM-DD');
        if (order === 'asc') {
          return dateA.unix() - dateB.unix();
        } else {
          return dateB.unix() - dateA.unix();
        }
      });
    },
    onBulk(ids, action) {
      console.log(ids, action);
    },
  },
};
</script>
