<template>
  <div>
    <transition :name="transitionName">
      <router-view
        :loading="loading"
        :locations="locations"
        :location="location"
        :contacts="contacts"
        :selectedContacts="selectedContacts"
        :offset="offset"
        @add="$router.push({ name: 'add_people' })"
        @select="toggleContact"
        @back="back"
        @next="$router.push({ name: 'add_location' })"
        @save="saveLocation"
        @delete="deleteLocation" />
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
      offset: 0,
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

    const offsetRef = firebase.database().ref('.info/serverTimeOffset');
    offsetRef.on('value', (snap) => {
      this.offset = snap.val();
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
    back() {
      this.selectedContacts = [];
      this.$router.push({ name: 'locations' });
    },

    saveLocation(location) {
      const key = this.db.push({ createdAt: firebase.database.ServerValue.TIMESTAMP }).key;

      this.loading = true;
      this.db.child(key).update({
        ...location,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
        time: (location.time * (60 * 1000)) + new Date().getTime() + this.offset
      })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: 'locations' });
          this.selectedContacts = [];
        });
    },

    toggleContact(key) {
      const index = this.selectedContacts.indexOf(key);

      if (index === -1) {
        this.selectedContacts.push(key);
      } else {
        this.selectedContacts.splice(index, 1);
      }
    },

    deleteLocation(key) {
      this.db.child(key).remove();
    },

    locationAdded(data) {
      const location = data.val();
      location.key = data.key;
      location.offset = this.offset;

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
