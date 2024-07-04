import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import VeeValidatePlugin from '@/includes/validation';
import Toast from '@/includes/toast';
import VueSelect from '@/includes/v-select';
import Icons from '@/includes/icons';
import ClickOutside from '@/directives/clickOutside';

import Components from '@/includes/components';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// includes
app.use(VeeValidatePlugin);
app.use(Toast);
app.use(VueSelect);
app.use(Icons);

// directives
app.use(ClickOutside);

// global components
app.use(Components);

app.mount('#app');
