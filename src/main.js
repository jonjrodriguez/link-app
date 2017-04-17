import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import App from './App';
import router from './router';

const config = {
  apiKey: 'AIzaSyChhGPqVlHA5YBF7LcD-4hqA82KYWtTEss',
  authDomain: 'link-app-c59fc.firebaseapp.com',
  databaseURL: 'https://link-app-c59fc.firebaseio.com',
  projectId: 'link-app-c59fc',
  storageBucket: 'link-app-c59fc.appspot.com',
  messagingSenderId: '298714640623'
};
firebase.initializeApp(config);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
