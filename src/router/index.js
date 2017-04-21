import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';

import Locations from '@/components/locations/Locations';
import LocationList from '@/components/locations/List';
import LocationDetail from '@/components/locations/Detail';
import AddPeople from '@/components/locations/AddPeople';
import AddLocation from '@/components/locations/AddLocation';

import Contacts from '@/components/contacts/Contacts';
import ContactList from '@/components/contacts/List';
import EditContact from '@/components/contacts/Edit';

import Login from '@/components/Login';

Vue.use(Router);

let authCompleted = false;
function getUser() {
  return new Promise((resolve) => {
    if (authCompleted) {
      resolve(firebase.auth().currentUser);
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      authCompleted = true;
      resolve(user);
    });
  });
}

const router = new Router({
  mode: 'history',
  linkActiveClass: 'mdc-temporary-drawer--selected',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      component: Locations,
      children: [
        { path: '', name: 'locations', component: LocationList },
        { path: 'view', name: 'view_location', component: LocationDetail },
        { path: 'add', name: 'add_people', component: AddPeople },
        { path: 'add/location', name: 'add_location', component: AddLocation }
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
  getUser().then((user) => {
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
});

export default router;
