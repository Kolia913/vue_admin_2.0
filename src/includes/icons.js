import { OhVueIcon, addIcons } from 'oh-vue-icons';
import * as MaterialIcons from 'oh-vue-icons/icons/md';
import * as BootstrapIcons from 'oh-vue-icons/icons/bi';

const Md = Object.values({ ...MaterialIcons });
const Bi = Object.values({ ...BootstrapIcons });
addIcons(...Md);
addIcons(...Bi);

export default {
  install(app) {
    app.component('v-icon', OhVueIcon);
  },
};
