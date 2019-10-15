import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'set-time-page',
      component: require('@/components/SetTimePage/SetTimePage').default,
    },
    {
      path: '/alert',
      name: 'alert-page',
      component: require('@/components/AlertPage/AlertPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
