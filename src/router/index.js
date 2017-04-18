import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';

import Locations from '@/components/locations/Locations';
import LocationList from '@/components/locations/List';

import Contacts from '@/components/contacts/Contacts';
import ContactList from '@/components/contacts/List';
import EditContact from '@/components/contacts/Edit';

import Login from '@/components/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'mdc-temporary-drawer--selected',
  routes: [
    {
      path: '/',
      component: Locations,
      children: [
        { path: '', name: 'locations', component: LocationList }
      ]
    },
    {
      path: '/contacts',
      component: Contacts,
      children: [
        { path: '', name: 'contacts', component: ContactList },
        { path: 'add', name: 'add_contact', component: EditContact },
        { path: 'edit', name: 'edit_contact', component: EditContact }
      ]
    },
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
