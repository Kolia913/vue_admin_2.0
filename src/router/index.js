import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';

import DashboardView from '@/views/DashboardView.vue';
import Dictionaries from '@/views/Dictionary/Dictionaries';
import FilemanagerView from '@/views/FileManagerView.vue';
import AppRouter from '@/core/AppRouter';

function isAuthenticated(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/login');
  }
}

const appRouter = new AppRouter();

// Dictionaries module
appRouter.registerModule(Dictionaries, 'Dictionaries', {
  dynamicRouteParam: 'slug',
  guards: { beforeEnter: isAuthenticated },
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { layout: 'EmptyLayout' },
    },
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/filemanager',
      name: 'Filemanager',
      component: FilemanagerView,
      beforeEnter: isAuthenticated,
    },
  ].concat(...appRouter.routes),
});

export default router;
