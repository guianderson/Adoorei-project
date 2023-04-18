import { RouteRecordRaw, NavigationGuard } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const requiresAuth: NavigationGuard = (to, from, next) => {
  const authService = useAuthStore();
  const authData = localStorage.getItem('auth');
  const currentTime = Date.now();
  const oneHourInMilliseconds = 60 * 60 * 1000;
  if (authData) {
    const { token, lastActivityTime } = JSON.parse(authData);
    if (currentTime - lastActivityTime < oneHourInMilliseconds && token) {
      next();
    } else {
      authService.logout();
      next('/');
    }
  } else {
    next('/');
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/LoginPage.vue') },
      { path: 'login', component: () => import('src/pages/LoginPage.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/RegisterPage.vue') },
    ],
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('src/pages/Index.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

routes.forEach((route) => {
  if (route.meta && route.meta.requiresAuth) {
    route.beforeEnter = requiresAuth;
  }
});

export default routes;
