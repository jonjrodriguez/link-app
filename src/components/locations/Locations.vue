<template>
  <div>
    <transition :name="transitionName">
      <router-view
        :loading="loading"
        :locations="locations"
        :location="location"
        :invitees="invitees"
        :contacts="contacts"
        :selectedContacts="selectedContacts"
        :offset="offset"
        @view="viewLocation"
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
      inviteeDb: null,
      locations: [],
      invitees: {},
      location: { invitees: {} },
      contacts: {},
      selectedContacts: [],
      transitionName: '',
      offset: 0,
      loading: true
    };
  },

  created() {
    const user = firebase.auth().currentUser;

    this.db = firebase.database().ref(`locations/${user.uid}`);
    this.inviteeDb = firebase.database().ref(`invitees/${user.uid}`);

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

    this.inviteeDb.on('child_added', data => this.inviteesAdded(data));
    this.inviteeDb.on('child_changed', data => this.inviteesUpdated(data));
    this.inviteeDb.on('child_removed', data => this.inviteesDeleted(data));
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
      this.$router.push({ name: 'locations' });
      this.selectedContacts = [];
      this.location = {};
    },

    viewLocation(index) {
      this.location = this.locations[index];
      this.$set(this.location, 'invitees', this.invitees[this.location.key]);

      this.$router.push({ name: 'view_location' });
    },

    saveLocation(location) {
      this.loading = true;

      const newLocation = this.db.push({
        ...location,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
        time: (location.time * (60 * 1000)) + new Date().getTime() + this.offset
      });

      this.saveInvitees(newLocation.key)
        .then(() => {
          this.loading = false;
          this.$router.push({ name: 'locations' });
          this.selectedContacts = [];
        });
    },

    saveInvitees(key) {
      const invitees = {};
      this.selectedContacts.forEach((contact) => {
        invitees[contact] = '';
      });

      return this.inviteeDb.child(key).set(invitees);
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
      this.inviteeDb.child(key).remove();
      this.db.child(key).remove();
    },

    locationAdded(data) {
      const location = data.val();
      location.key = data.key;

      this.locations.push(location);
      this.$set(this.invitees, data.key, {});
    },

    locationUpdated(data) {
      const index = this.locations.findIndex(location => location.key === data.key);
      this.locations.splice(index, 1, { ...this.locations[index], ...data.val() });
    },

    locationDeleted(data) {
      const index = this.locations.findIndex(location => location.key === data.key);
      this.locations.splice(index, 1);
    },

    inviteesAdded(data) {
      this.$set(this.invitees, data.key, data.val());
    },

    inviteesUpdated(data) {
      this.invitees[data.key] = data.val();
    },

    inviteesDeleted(data) {
      delete this.invitees[data.key];
    }
  }
};
</script>
