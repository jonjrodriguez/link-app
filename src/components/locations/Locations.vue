<template>
  <div>
    <transition :name="transitionName">
      <router-view
        :loading="loading"
        :locations="locations"
        :location="location"
        :contacts="contacts"
        :selectedContacts="selectedContacts"
        @add="$router.push({ name: 'add_people' })"
        @select="toggleContact"
        @next="$router.push({ name: 'add_location' })" />
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'Locations',

  data() {
    return {
      db: null,
      locations: [],
      location: {},
      contacts: {},
      selectedContacts: [],
      transitionName: '',
      loading: false
    };
  },

  created() {
    this.loading = true;
    const user = firebase.auth().currentUser;
    this.db = firebase.database().ref(`locations/${user.uid}`);

    const contactRef = firebase.database().ref(`contacts/${user.uid}`);
    contactRef.once('value').then((snap) => {
      this.contacts = snap.val();
    });

    this.db.once('value').then(() => {
      this.loading = false;
    });

    this.db.on('child_added', data => this.locationAdded(data));
    this.db.on('child_changed', data => this.locationUpdated(data));
    this.db.on('child_removed', data => this.locationDeleted(data));
  },

  beforeDestroy() {
    this.db.off();
  },

  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split('/').filter(String).length;
    const fromDepth = from.path.split('/').filter(String).length;
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    next();
  },

  methods: {
    toggleContact(key) {
      const index = this.selectedContacts.indexOf(key);

      if (index === -1) {
        this.selectedContacts.push(key);
      } else {
        this.selectedContacts.splice(index, 1);
      }
    },

    locationAdded(data) {
      const location = data.val();
      location.key = data.key;

      this.locations.push(location);
    },

    locationUpdated(data) {
      const index = this.locations.findIndex(location => location.key === data.key);
      this.locations.splice(index, 1, { ...this.locations[index], ...data.val() });
    },

    locationDeleted(data) {
      const index = this.locations.findIndex(location => location.key === data.key);
      this.locations.splice(index, 1);
    }
  }
};
</script>
