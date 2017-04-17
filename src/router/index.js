import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
import Locations from '@/components/Locations';
import Contacts from '@/components/Contacts';
import Login from '@/components/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'mdc-temporary-drawer--selected',
  routes: [
    { path: '/', name: 'locations', component: Locations },
    { path: '/contacts', name: 'contacts', component: Contacts },
    { path: '/login', name: 'login', component: Login, meta: { allowAnonymous: true } }
  ]
});

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;

  if (user && to.path === '/login') {
    return next('/');
  }

  if (user || to.matched.every(record => record.meta.allowAnonymous)) {
    return next();
  }

  return next({
    path: '/login',
    query: {
      redirect: to.fullPath
    }
  });
});

export default router;
