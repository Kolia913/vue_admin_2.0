<template>
  <div class="file-manager border dark:border-grey-dark-border mt-5 rounded-md">
    <div class="file-manager__top w-100 border-b">
      <div class="file-manager__options flex items-center h-full">
        <template v-for="(item, index) in optionsList" :key="'options-' + index">
          <div class="file-manager__options-item ps-3 pe-3 cursor-pointer relative">
            <p @click="item.function">{{ item.name }}</p>
            <ul v-if="item.list">
              <template
                v-for="(itemMenu, indexMenu) in item.list"
                :key="'itemMenu-' + itemMenu.id + indexMenu"
              >
                <li @click="itemMenu.function" class="dark:text-slate-800">
                  {{ itemMenu.name }}
                </li>
              </template>
            </ul>
          </div>
        </template>
      </div>
    </div>
    <div class="file-manager__content w-full h-fullrounded-br-lg rounded-bl-lg flex">
      <div
        class="file-manager__directions p-5 border-r border-slate-300 dark:border-slate-600 w-1/5"
        v-if="directionList"
      >
        <div
          class="file-manager__directions-breadcrumb mb-2 flex p-2 rounded-sm"
          :class="+activeItem == -1"
        >
          <template
            v-for="(itemBreadcrumbs, indexBreadcrumbs) in breadcrumbs"
            :key="'breadcrumb-' + indexBreadcrumbs"
          >
            <p
              class="text-slate-800 dark:text-slate-800 cursor-pointer hover:bg-gray-300 flex"
              @click="chanageBreadcrumbsDirect(itemBreadcrumbs, indexBreadcrumbs)"
            >
              {{ itemBreadcrumbs.title }}
              <span class="px-2" v-if="indexBreadcrumbs !== breadcrumbs.length - 1"> > </span>
            </p>
          </template>
        </div>
        <template v-for="(item, index) in directionList.directories" :key="'direction' + index">
          <div
            class="file-manager__directions-item flex cursor-pointer hover:bg-gray-300 pr-2 pl-2 ps-1 pe-1 rounded-sm items-center"
            v-if="item.type === 'dir'"
            @click="changeDirectFiles(index)"
            @dblclick="() => goToDirect(item, index)"
          >
            <DirectIcon class="w-5 h-7 mr-3" />
            <p class="dark:text-slate-800">
              {{ item.basename }}
              <span> d({{ item.directories.length }}) </span>
              <span> f({{ item.files.length }}) </span>
            </p>
          </div>
        </template>
      </div>
      <div
        class="file-manager__directions p-5 border-r border-slate-300 dark:border-slate-600 w-1/5"
        v-else
      >
        <div
          class="file-manager__directions-item flex cursor-pointer hover:bg-gray-300 pr-2 pl-2 ps-1 pe-1 rounded-sm items-center"
        >
          <DirectIcon class="w-5 h-7 mr-3" />
          <p class="dark:text-slate-800">
            {{ empty }}
            <span> d(0) </span>
            <span> f(0) </span>
          </p>
        </div>
      </div>
      <div class="file-manager__files p-1 w-4/5 flex flex-wrap">
        <div class="file-manager__files-list">
          <template v-for="(item, index) in showFiles" :key="'file-' + index">
            <div
              v-if="item.type === 'file'"
              class="file-manager__files-item p-2 items-center flex flex-col justify-start cursor-pointer hover:bg-grey-100"
              @contextmenu="rightImgClick($event, index)"
              @dblclick="() => fileDbClick(item, index)"
            >
              <!-- <FileIcon class="w-10 h-10 mb-2" /> -->
              <img
                v-if="
                  item.extension === 'jpg' || item.extension === 'png' || item.extension === 'webp'
                "
                :src="Config.baseStorage + item.path"
                alt="img"
              />
              <FileIconVue class="h-12" v-else />
              <span v-if="item.extension">{{ item.extension }}</span>
              <div class="file-manager__text">
                <p class="dark:text-slate-800 text-xs">{{ item.basename }}</p>
              </div>
              <ul
                class="file-manager__context-menu"
                v-show="indexOpenContextMenu === index"
                v-click-outside="() => (indexOpenContextMenu = -1)"
              >
                <li
                  @click="() => showImage(item)"
                  v-if="
                    item.extension === 'jpg' ||
                    item.extension === 'png' ||
                    item.extension === 'webp'
                  "
                >
                  <p>View file</p>
                </li>
                <li @click="() => removeFile(item.path, item.type)">
                  <p>Delete file</p>
                </li>
                <li @click="() => renameFile(item)">
                  <p>Rename file</p>
                </li>
                <li @click="() => showImageInfo(item)">
                  <p>View info</p>
                </li>
                <li @click="() => copyPath(item.path, true)">
                  <p>Copy url</p>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
    <ShowFile v-if="toogleShowImage" :imgItem="choiceFileItem" @close="closeShowImage" />
    <ShowFileInfo v-if="toogleShowInfo" :imgItem="choiceFileItem" @close="closeShowImage" />
    <ImportFile
      v-if="showImportFile"
      :dirName="dirName"
      @close="() => (showImportFile = false)"
      @successUpload="() => successUpload()"
    />
    <ModalsConfirm
      v-if="toggleConfirmModal"
      @close="() => (toggleConfirmModal = false)"
      @ConfirmStatus="(status) => confirmRemoveFile(status)"
      :confirmText="'Ви справді бажаєте видалити цей файл ?'"
    />
    <CreateDirectory
      v-if="toggleCreateDirectoryModal"
      @close="hideCreateDirectoryModal"
      @createDirectory="(name) => createDirectory(name)"
    />
    <RenameFileModal
      v-if="toogleShowRenameFile"
      :choiceFile="choiceFileItem"
      @close="() => (toogleShowRenameFile = false)"
      @successRename="() => successRename()"
    />
  </div>
</template>
<script setup>
// #TODO: Replace with new standard
import Config from '@/core/_internal/Config';
import { ref, reactive, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import DirectIcon from '../../icons/DirectIcon.vue';
import useFilemanagerStore from '@/stores/filemanager';
import ImportFile from './ImportFiles.vue';
import ShowFile from './ShowFile.vue';
import ShowFileInfo from './ShowFileInfo.vue';
import ModalsConfirm from '../../general/ModalsConfirm.vue';
import CreateDirectory from './CreateDirectory.vue';
import FileIconVue from '../../icons/FileIcon.vue';
import RenameFileModal from './RenameFile.vue';

const $toast = useToast();

const filemanagerStore = useFilemanagerStore();

const props = defineProps(['modalStatus']);
const $emit = defineEmits(['close', 'sendPath']);

let toggleConfirmModal = ref(false);
let toggleCreateDirectoryModal = ref(false);
let removePayload = reactive({});
let breadcrumbs = reactive([
  {
    id: -1,
    index: 0,
    title: 'Main',
  },
]);
let activeItem = ref(-1);
let showFiles = ref([]);
let directies = reactive([]);
let directionList = ref([]);
let optionsList = reactive([
  {
    id: 1,
    name: 'Upload file',
    function: importFileFunc,
  },
  {
    id: 2,
    name: 'Create directory',
    function: createNewDirecroty,
  },
  {
    id: 4,
    name: 'Info',
  },
  {
    id: 5,
    name: 'View',
  },
]);
let indexOpenContextMenu = ref(-1);
let showImportFile = ref(false);
let toogleShowImage = ref(false);
let toogleShowInfo = ref(false);
let toogleShowRenameFile = ref(false);
let choiceFileItem = reactive(null);
let dirName = ref(null);
let choiceDirectIndex = ref(-1);

const disk = computed(() => filemanagerStore.disk);

onMounted(() => {
  getAllFilesRequest();
  filemanagerStore.getFilemanagerTree();
});

const rightImgClick = (e, index) => {
  //do stuff
  e.preventDefault();
  indexOpenContextMenu.value = index;
};
const changeDirectFiles = (index) => {
  choiceDirectIndex.value = index;
  showFiles.value = [];
  showFiles.value = directionList.value.directories[index].files;
  dirName.value = directionList.value.directories[index].path;
};
const chanageBreadcrumbsDirect = (item, index) => {
  if (!index) {
    showFiles.value = directies.files;
    dirName.value = null;
  }
};
function createNewDirecroty() {
  toggleCreateDirectoryModal.value = true;
}
const createDirectory = (name) => {
  const payload = {
    disk: 'public',
    name,
    path: null,
  };
  filemanagerStore.createFolder(payload).then(() => {
    $toast.success('Нова директорія успішно створена');
    getAllFilesRequest();
  });
  toggleCreateDirectoryModal.value = false;
};
const showImage = (item) => {
  choiceFileItem = item;
  toogleShowImage.value = true;
};
const showImageInfo = (item) => {
  choiceFileItem = item;
  toogleShowInfo.value = true;
};
const closeShowImage = () => {
  toogleShowImage.value = false;
  toogleShowInfo.value = false;
  choiceFileItem = null;
};
const copyPath = (path, fullPath) => {
  let pathUrl = path;
  if (fullPath) {
    pathUrl = Config.baseStorage + path;
  }
  navigator.clipboard.writeText(pathUrl);
  $toast.success('Copied');
};
const fileDbClick = (item) => {
  if (props.modalStatus) {
    copyPath(item.path);
    $emit('sendPath', item.path);
    $emit('close');
  }
};
const successUpload = () => {
  $toast.success('Файл успішно завантажений');
  getAllFilesRequest();
  showImportFile.value = false;
};
const successRename = () => {
  $toast.success('Файл успішно перейменовано');
  getAllFilesRequest();
  toogleShowRenameFile.value = false;
};
function importFileFunc() {
  console.log('importFileFunc ');
  showImportFile.value = true;
}
const renameFile = (item) => {
  choiceFileItem = item;
  toogleShowRenameFile.value = true;
  console.log('renameFile');
};
const removeFile = (path, type) => {
  const payload = {
    disk: disk.value,
    items: [{ path, type }],
  };
  removePayload = payload;
  toggleConfirmModal.value = true;
};
const getAllFilesRequest = () => {
  filemanagerStore.getAllFiles().then((res) => {
    directies = res;
    directionList.value = res;
    showFiles.value =
      choiceDirectIndex.value !== -1
        ? directionList.value.directories[choiceDirectIndex.value].files
        : res.files;
    dirName.value =
      choiceDirectIndex.value !== -1
        ? directionList.value.directories[choiceDirectIndex.value].path
        : '';
  });
  // directionList = fileList;
};
const confirmRemoveFile = (status) => {
  if (status) {
    filemanagerStore.deleteFile(removePayload).then(() => {
      $toast.success('Файл успішно видалений');
      getAllFilesRequest();
    });
  }
  toggleConfirmModal.value = false;
};

const hideCreateDirectoryModal = () => {
  console.log('test');
  toggleCreateDirectoryModal.value = false;
};
</script>
<style lang="scss" scoped>
.file-manager {
  width: 100%;
  &__top {
    height: 35px;
  }
  &__content {
    background-color: azure;
  }
  &__directions-breadcrumb {
    overflow-x: auto;
    display: flex;

    &::-webkit-scrollbar {
      width: 6px;
      height: 4px;
    }
    p {
      white-space: nowrap;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #5b5d60;
      outline: 1px solid #cacaca;
    }
  }
  &__directions-item {
    transition: 0.3s all;
    &.active {
      background-color: rgba(0, 0, 0, 0.5);
      p {
        color: white;
      }
    }
    p {
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      overflow: hidden;
      max-width: 100%;
      font-size: 14px;
      span {
        font-size: 10px;
        opacity: 0.7;
      }
    }
  }
  &__files {
    padding-right: 20px;
  }
  &__files-list {
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
  }
  &__directions,
  &__files {
    max-height: 70vh;
    min-height: 60vh;
    overflow: auto;
    @media screen and (max-height: 550px) {
      max-height: 60vh;
      min-height: 50vh;
    }
    @media screen and (max-height: 450px) {
      max-height: 50vh;
      min-height: 40vh;
    }
  }
  &__options-item {
    &:hover {
      p {
        opacity: 0.7;
      }
      ul {
        display: block;
      }
    }
    p {
      height: 34px;
      width: 100%;
      display: inline-block;
      line-height: 34px;
    }
    ul {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      padding: 5px 10px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
      li {
        padding: 2px 15px 2px 5px;
        cursor: pointer;
        user-select: none;
        &:hover {
          background: rgba(0, 0, 0, 0.5);
          color: white;
        }
      }
    }
  }
  &__files-item {
    width: 100px;
    max-height: 80px;
    position: relative;
    img {
      max-height: 75%;
    }
    span {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 1px 3px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 10px;
    }
  }
  &__context-menu {
    position: absolute;
    top: 50%;
    left: 70%;
    color: black;
    background: #cacaca;
    padding: 5px;
    border-radius: 3px;
    z-index: 100;
    li {
      p {
        text-align: left;
        height: 25px;
        padding: 2px 10px;
        white-space: nowrap;
        &:hover {
          white-space: nowrap;
        }
      }
    }
  }
  &__text {
    height: 16px;
    max-width: 100%;
    p {
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      overflow: hidden;
      max-width: 100%;
    }
    &:hover {
      p {
        background: rgb(244 244 245 / var(--tw-bg-opacity));
        overflow: visible;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
}

.dark {
  .file-manager__options {
    background: #18181b;
  }
}
</style>
