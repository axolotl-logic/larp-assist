// Vue
import { RouteRecordRaw, onBeforeRouteUpdate } from 'vue-router';

// Ours
import { useUserStore } from 'stores/user'

onBeforeRouteUpdate((from, to, next) => {
  const userStore = useUserStore()
  console.log('hi')
  Promise.all([
    userStore.fetchUserNames()
  ]).then(() => next())
})

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', 
        redirect: () => {
          const store = useUserStore()
          return { path: store.user.gm ? '/gm' : '/player' }
        },
      },
      { path: 'auth', component: () => import('pages/AuthPage.vue') },
      {
        path: 'player',
        children: [
          { path: '', component: () => import('pages/player/IndexPage.vue') },
        ]
      },
      {
        path: '/gm',
        children: [
          { path: '', component: () => import('pages/gm/IndexPage.vue') },
          { path: 'motds', component: () => import('pages/gm/MotdCrudPage.vue') },
        ]
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
