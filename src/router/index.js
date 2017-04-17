import Vue from 'vue';
import Router from 'vue-router';
import Locations from '@/components/Locations';
import Contacts from '@/components/Contacts';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'mdc-temporary-drawer--selected',
  routes: [
    { path: '/', name: 'locations', component: Locations },
    { path: '/contacts', name: 'contacts', component: Contacts },
    { path: '/login', name: 'login', component: Login }
  ]
});
